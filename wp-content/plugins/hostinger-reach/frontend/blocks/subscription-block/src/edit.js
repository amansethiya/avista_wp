import {useState, useEffect} from "react";
import apiFetch from '@wordpress/api-fetch';
import {useSelect, select} from '@wordpress/data';

import ServerSideRender from "@wordpress/server-side-render";
import {useBlockProps, InspectorControls} from "@wordpress/block-editor";
import {
	PanelBody,
	SelectControl,
	TextControl,
	ToggleControl,
	CheckboxControl, Flex, FlexItem, Button,
} from "@wordpress/components";
import {__} from '@wordpress/i18n';
import Connect from "./Components/Connect";
import Dialog from "./Components/Dialog";

const Edit = ({attributes, setAttributes, clientId}) => {
	const {isPostPublished, postPermalink} = useSelect((select) => ({
		isPostPublished: select('core/editor').isCurrentPostPublished()
	}));
	const [newTagName, setNewTagName] = useState('');
	const blockProps = useBlockProps();
	const nonce = wp.data.select('core/editor').getEditorSettings().nonce || '';
	const [isConnected, setIsConnected] = useState(true);
	const [showAddNewTag, setShowAddNewTag] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [tags, setTags] = useState([]);
	const [showDialog, setShowDialog] = useState(false);
	const [lastStatus, setLastStatus] = useState(null);

	const layoutOptions = [
		{label: __('Default', 'hostinger-reach'), value: 'default'},
		{label: __('Inline', 'hostinger-reach'), value: 'inline'}
	];

	useEffect(() => {
		if (isPostPublished && lastStatus !== null && lastStatus !== 'publish') {
			setShowDialog(true);
		}
	}, [isPostPublished, lastStatus]);


	useEffect(() => {
		setLastPostStatus();
		fetchTags();
		checkConnection();
	}, []);


	useEffect(() => {
		if (attributes.formId) return;
		setAttributes({formId: clientId});
	}, [setAttributes]);

	const fetchTags = async () => {
		await getTags();
	};


	const checkConnection = async () => {
		try {
			const response = await apiFetch({
				path: '/hostinger-reach/v1/overview',
				method: 'GET',
				headers: {
					'X-WP-Nonce': nonce,
				},
				parse: false,
			});

			if (response.ok) {
				setIsConnected(true);
			} else {
				setIsConnected(false);
			}

		} catch (err) {
			setIsConnected(false);
		}
	}

	const setLastPostStatus = () => {
		const lastKnownStatus = select('core/editor').getEditedPostAttribute('status');
		setLastStatus(lastKnownStatus);
	}

	const getTags = async () => {
		try {
			const response = await apiFetch({
				path: '/hostinger-reach/v1/tags',
				method: 'GET',
				headers: {
					'X-WP-Nonce': nonce,
				},
				parse: false,
			});

			if (response.ok) {
				const responseData = await response.json();
				const tagNames = responseData.data.map(tag => tag.value);
				setTags(tagNames);
			}
		} catch (err) {
			console.error(err);
		}
	}

	const createTag = async ( tag ) => {
		try {
			setIsLoading(true);
			const response = await apiFetch({
				path: '/hostinger-reach/v1/tags',
				method: 'POST',
				headers: {
					'X-WP-Nonce': nonce,
				},
				data: {
					names: [tag]
				},
			});

			if (response && response.data) {
				const tagNames = response.data.map(tag => tag.value);
				setTags([...tagNames, ...tags]);
			}
		} catch ( err ) {
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	}

	const isTagSelected = (tagName) => {
		const selectedTags = attributes.tags || [];
		return selectedTags.includes(tagName);
	}

	const handleTagToggle = (tagName) => {
		const selectedTags = attributes.tags || [];
		let newTags;
		if (isTagSelected(tagName)) {
			newTags = selectedTags.filter(tag => tag !== tagName);
		} else {
			newTags = [...selectedTags, tagName];
		}

		setAttributes({tags: newTags});
	};

	const addTag = async () => {
		const newTag = newTagName.trim();

		if (!newTag) {
			return;
		}

		const tagExists = tags.some(tag => tag === newTag);

		if (!tagExists) {
			await createTag( newTag );
		}

		if (!isTagSelected(newTag)) {
			handleTagToggle(newTag);
		}

		setNewTagName('');
	}

	const handleKeyPress = (event) => {
		if (event.key === 'Enter') {
			event.preventDefault();
			addTag();
		}
	};

	const toggleAddNewTag = () => {
		setShowAddNewTag( ! showAddNewTag );
	}

	return <div {...blockProps}>
		<InspectorControls key="hostinger-reach-block-controls">
			<PanelBody title={__("Settings", "hostinger-reach")}>
				{!isConnected && <Connect/>}
				<TextControl
					disabled
					label={__('Form ID', 'hostinger-reach')}
					value={attributes.formId}
					help={__('Unique identifier for this form', 'hostinger-reach')}
				/>
				<div>
					<strong>{__('Tags', 'hostinger-reach')}</strong>
					{tags.length > 0 && (
						<div className="hostinger-reach-block-tags">
							{tags.map((tag) => {
								const selectedTags = attributes.tags || [];
								return (
									<CheckboxControl
										key={tag}
										label={tag}
										checked={selectedTags.includes(tag)}
										onChange={() => handleTagToggle(tag)}
									/>
								);
							})}
						</div>
					)}
				</div>
				<Button
					className="hostinger-reach-block-toggler"
					variant="link"
					onClick={toggleAddNewTag}
				>
					{__('Add New Tag', 'hostinger-reach')}
				</Button>
				{showAddNewTag && <Flex className="hostinger-reach-block-newtag" direction="column" align="flex-start" gap={1}>
					<FlexItem style={{flex: 1}}>
						<TextControl
							label={__('New Tag Name', 'hostinger-reach')}
							value={newTagName}
							onChange={(value) => {
								setNewTagName(value);
							}}
							onKeyDown={handleKeyPress}
							help={__('Enter tag name and press Enter or click Add Tag', 'hostinger-reach')}
						/>
					</FlexItem>
					<FlexItem>
						<Button
							variant="secondary"
							onClick={addTag}
							disabled={!newTagName.trim() || isLoading}
						>
							{__('Add Tag', 'hostinger-reach')}
						</Button>
					</FlexItem>
				</Flex> }
				<ToggleControl
					label={__("Show Name Field?", "hostinger-reach")}
					key="hostinger-reach-block-show-name-field"
					checked={attributes.showName}
					onChange={(value) =>
						setAttributes({showName: value})
					}
				/>
				<ToggleControl
					label={__("Show Surname Field?", "hostinger-reach")}
					key="hostinger-reach-block-show-surname-field"
					checked={attributes.showSurname}
					onChange={(value) =>
						setAttributes({showSurname: value})
					}
				/>
			</PanelBody>
			<PanelBody title={__('Layout Settings', 'hostinger-reach')}>
				<SelectControl
					label={__('Layout', 'hostinger-reach')}
					value={attributes.layout}
					options={layoutOptions}
					onChange={(value) => setAttributes({layout: value})}
				/>
			</PanelBody>

		</InspectorControls>
		{!isConnected && <Connect/>}
		<ServerSideRender
			key="hostinger-reach-server-side-renderer"
			block="hostinger-reach/subscription"
			attributes={attributes}
		/>
		{showDialog && <Dialog onClose={() => setShowDialog(false)}/>}
	</div>

}

export default Edit;
