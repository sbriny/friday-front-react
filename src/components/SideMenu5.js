import React from 'react';
import styled from '@emotion/styled';
import RSSTimeline from './RSSTimeline';
import PhotoSphere from './PhotoSphere';
import RotatingEarth from './RotatingEarth';

const MenuContainer = styled.div`
// border: 5px solid #cda;
border-left: 1px solid rgb(223,225,229);
top: 0;
right: 0;
margin-left:auto;
margin-right:auto;
// padding:1rem;
bottom: 0;
width:2.3rem;
// background-color: ${props => props.theme.background};
background-color: rgb(245,246,249);
color: ${props => props.theme.text};
position: absolute;
display: flex;
flex-direction:row;
justify-content: space-between;
`;

const MenuItem = styled.div`
  padding: 10px;
  cursor: pointer;
  border: 5px solid #cdcdcd;
  height:3rem;
  width:3rem;
  text-align:center;
  line-height: 5rem;
  border-radius: 50%;
  &:hover {
    // background-color: ${props => props.theme.primary};
  }
  overflow: hidden;
`;
const SideMenu = () => {
    const imageUrls = [
        '/python/demo/assets/264e646a-59a6-4b8e-98b6-f4c851406c9d.jpg',
        '/python/demo/assets/3e519d1559444c96834cd09975aa787c.jpeg',
        '/python/demo/assets/a5855add1bdc40d191995db296c98136.jpeg',
        '/python/demo/assets/d2602eee06844f246dc550aa7cb9dbcb.jpeg',
        '/python/demo/assets/u=1835650474,2626733330&fm=253&fmt=auto&app=138&f=JPEG.jpg',
        '/python/demo/assets/下载.jpeg'
      ];

  return (
    <MenuContainer>
      {/* <MenuItem>
        <RSSTimeline/>
      </MenuItem>
      <MenuItem>
        <PhotoSphere imageUrls={imageUrls} width={500} height={500} />
      </MenuItem>
      <MenuItem>
        <RotatingEarth/>
      </MenuItem> */}
    </MenuContainer>
  );
};

export default SideMenu;
