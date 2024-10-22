import React, { useEffect, useRef, useState } from 'react';
import { useResult } from './Context';

//获取图像URL合集函数；
/**
 * 原始image数据，获取原始图片URL数组，这些URL不包含图片的宽度和高度信息；
 * @param {*} r 
 * @returns 
 */
 function loadALLImgs(r) {
    return r.keys().map(r);
}

const CharactersCanvas = () => {
    const canvasRef = useRef(null);
    const scriptRef = useRef(null);
    const { result, setResult } = useResult();

    // 图像路径地址集合
    const [imageUrlsMap, setImageUrlsMap] = useState([]);

    // 图像数据集合
    const [pic, setImageData] = useState([]);

    useEffect(() => {
        const urls = loadALLImgs(require.context('../source', false, /\.(png|jpe?g|svg|jfif)$/));
        setImageUrlsMap(urls);
        }, []);

    // 更新 result 中的 imageUrlsMap
    useEffect(() => {
        setResult(prevResult => ({
            ...prevResult,
            imageUrlsMap: imageUrlsMap
        }));
    }, [imageUrlsMap, setResult]);

    // 加载图片数据
    useEffect(() => {
        Promise.all(imageUrlsMap.map(url =>
            new Promise((resolve) => {
                const img = new Image();
                img.onload = () => resolve({ url, width: img.width, height: img.height });
                img.src = url;
            })
        )).then(data => {
            setImageData(data);
        });
    }, [imageUrlsMap]);

    // TagCanvas 初始化代码
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/tagcanvas/2.9/tagcanvas.min.js";
        script.async = true;
        document.body.appendChild(script);
        scriptRef.current = script;

        const initializeCanvas = () => {
            if (window.TagCanvas) {
                try {
                    window.TagCanvas.Start('myCanvas', 'tags', {
                        textColour: '#ff0000',
                        outlineColour: '#ff00ff',
                        reverse: true,
                        depth: 0.8,
                        maxSpeed: 0.05,
                        weight: true
                    });
                    console.log("TagCanvas initialized successfully");
                } catch (e) {
                    console.error("TagCanvas initialization failed", e);
                    if (canvasRef.current) {
                        canvasRef.current.style.display = 'none';
                    }
                }
            } else {
                console.error("TagCanvas is not available");
            }
        };

        if (window.TagCanvas) {
            initializeCanvas();
        } else {
            script.onload = initializeCanvas;
        }

        return () => {
            if (window.TagCanvas) {
                window.TagCanvas.Delete('myCanvas');
            }
            if (scriptRef.current && scriptRef.current.parentNode) {
                scriptRef.current.parentNode.removeChild(scriptRef.current);
            }
        };
    }, []);

    return (
        <div>
            <canvas id="myCanvas" ref={canvasRef} width="500" height="500">
                <p>This browser doesn't support canvas.</p>
            </canvas>

            <div id="tags" style={{display: 'none'}}>
                <ul>
                    {pic.map((img, index) => (
                        <li key={index}>
                            <a href="#">
                                <img src={img.url} alt={`Image ${index + 1}`} />
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            <style>{`
                #myCanvas {
                    width: 500px;
                    height: 500px;
                    border: 1px solid #ccc;
                }
            `}</style>
        </div>
    );
}

export default CharactersCanvas;