import React, { useState } from 'react';

const TruncatedText = ({ text, maxLines }) => {
  const [isTruncated, setIsTruncated] = useState(true);

  const toggleTruncate = () => {
    setIsTruncated(!isTruncated);
  };

  const textStyles = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: maxLines,
    WebkitBoxOrient: 'vertical',
  };

  return (
    <div>
      <div style={isTruncated ? textStyles : null}>{text}</div>
      <button onClick={toggleTruncate} style={{ marginTop: '8px' }}>
        {isTruncated ? 'Read more' : 'Read less'}
      </button>
    </div>
  );
};

export default TruncatedText;
