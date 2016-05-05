import React from 'react';


const Button = ({ label, onClick, textAlign }) => {
  return (
    <div style={{ textAlign }}>
      <RaisedButton label={label} primary onClick={onClick} />
    </div>
  );
};

Button.propTypes = {
  onClick: React.PropTypes.func.isRequired,
  label: React.PropTypes.string.isRequired,
  textAlign: React.PropTypes.string.isRequired,
};


export const NextButton = (props) => {
  return <Button {...props} textAlign='right'/>
}


export const PrevButton = (props) => {
  return <Button {...props} textAlign='left'/>
}