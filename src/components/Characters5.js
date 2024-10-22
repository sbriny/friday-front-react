//Character.js
import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled';
import '../assets/style/font.css';
import AddElementDialog from './CharacterAdd';
import CharacterMenu from './CharacterMenu';
import { useResult } from './Context';
import settings from '../source/setting.png';
import video_icon from '../source/icons/video_recorder.png';
import pictrue_icon from '../source/icons/pic.png';
import axios from 'axios';

import CharacterList from './Characters4.js';
import CharacterGrid from './Character.js';

import CharacterListIcon from '../source/icons/list-1.png';
import CharacterGridIcon from '../source/icons/grid-1.png';

const CharacterMenuBar=styled.div`
border: 1px solid #ccc;
position: fixed;
margin-top: 3rem;
display: flex;
`;

const CharacterMenuStartContainer=styled.div`
border: 1px solid #ccc;
flex-grow: 3`;

const CharacterMenuCompositionContainer=styled.div`
border: 1px solid #ccc;
flex-grow: 1;
`;

const CharacterMenuCompositionListIcon=styled.img`
border: 1px solid #ccc;
height: 1rem;
`;
const CharacterMenuCompositionGridIcon=styled.img`
border: 1px solid #ccc;
height: 1rem;
`;

const Characters = () => {
    
    const [layout,setLayout]=useState("list");
    
    const handleLayoutChange=(selectedLayout)=>{
        setLayout(selectedLayout);
    }
    
    return (
        <>
        <CharacterMenuBar>
            <CharacterMenuStartContainer></CharacterMenuStartContainer>
            <CharacterMenuCompositionContainer>
                <CharacterMenuCompositionListIcon src={CharacterListIcon} onClick={()=> handleLayoutChange('list')}></CharacterMenuCompositionListIcon>
                <CharacterMenuCompositionGridIcon src={CharacterGridIcon} onClick={()=>handleLayoutChange('grid')}></CharacterMenuCompositionGridIcon>
            </CharacterMenuCompositionContainer>
        </CharacterMenuBar>
        {layout === 'list' ? <CharacterList /> : <CharacterGrid />}
        </>
    );

};

export default Characters;