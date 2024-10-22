import React from "react";
import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';

import settings from '../source/setting.png';
import Subtraction from '../assets/pic/sub.png';
import Addition from '../assets/pic/add.png';
import figureType from '../source/clothes-briefs.png';

const MenuItem = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid rgba(151,151,151,0.5);
  box-shadow: 0 0px 1rem 0px rgba(12,3,6,.1);
  cursor: pointer;
  background-color: rgb(245,246,249);
  background-image: ${props => `url(${props.backgroundImage || settings})`};
  background-size: 70%;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 1rem;
  margin: 0 0 0 .5rem;

  &:hover {
    background-color: rgb(234,235,239);
  }
`;

const Menu = styled.div`
  display: flex;
`;

const ExpandableMenuItem = styled(MenuItem)`
  // 可以添加额外的样式
`;

const ExpandableMenuColumn = ({subIcons, onItemClick}) => {
  return (
    <>
      {subIcons.map((item, index) => (
        <ExpandableMenuItem
          key={index}
          backgroundImage={item.icon}
          onClick={() => {
            console.log(`Clicked item ${index}`);
            onItemClick && onItemClick(item.route);
          }}
        />
      ))}
    </>
  );
};

const CharacterMenu = () => {
  const subIcons = [
    { icon: figureType, route: "/subtract" },
    { icon: figureType, route: "/add" },
    { icon: figureType, route: "/"}
  ];

  const handleItemClick = (route) => {
    console.log(`Navigating to ${route}`);
    // 这里可以添加导航逻辑
  };

  return (
    <Menu>
      <ExpandableMenuColumn subIcons={subIcons} onItemClick={handleItemClick} />
    </Menu>
  );
};

export default CharacterMenu;