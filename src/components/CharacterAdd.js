import React, { useState } from 'react';
import { Button, Dialog, FilePicker, Pane, TextInput } from 'evergreen-ui';

const AddElementDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
    setTitle('');
    setImage(null);
  };

  const handleTitleChange = (event) => setTitle(event.target.value);

  const handleImageUpload = (files) => {
    const file = files[0];
    setImage(file);
  };

  const handleAddElement = () => {
    // 在这里处理添加元素的逻辑,例如将标题和图片上传到服务器
    console.log('标题:', title);
    console.log('图片:', image);
    handleClose();
  };

  return (
    <Pane>
      <Button onClick={handleOpen}>添加元素</Button>

      <Dialog isShown={isOpen} title="添加元素" onCloseComplete={handleClose}>
        <Pane marginBottom={16}>
          <TextInput
            name="title"
            placeholder="输入标题"
            value={title}
            onChange={handleTitleChange}
          />
        </Pane>

        <Pane marginBottom={16}>
          <FilePicker
            width={250}
            onChange={handleImageUpload}
            placeholder="选择图片"
          />
        </Pane>

        <Pane display="flex" justifyContent="flex-end">
          <Button marginRight={16} onClick={handleClose}>
            取消
          </Button>
          <Button appearance="primary" onClick={handleAddElement}>
            确定
          </Button>
        </Pane>
      </Dialog>
    </Pane>
  );
};

export default AddElementDialog;