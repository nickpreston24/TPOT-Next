export const SubmitButton = ({ onClick, children, pallete }) => {
  return (
    <span>
      <button type="submit" onClick={onClick}>
        {children}
      </button>
      {pallete && <style jsx>{`
        button{
            border: "2px solid" + ${pallete.primary.teal};
            color:${pallete.primary.white};
            background-color:${pallete.primary.teal};
            display:inline-block;
            padding:0.3em 1.2em;
            margin:0 0.3em 0.3em 0;
            border-radius:2em;
            box-sizing: border-box;
            text-decoration:none;
            font-family:'Roboto',sans-serif;
            font-weight:400;
            text-align:center;
            transition: all 0.2s;
          }          
          button:hover{
            background-color:${pallete.primary.teal};
            border-color: ${pallete.primary.blue}
          }
          @media all and (max-width:30em){
           button{
            display:block;
            margin:0.2em auto;
           }
          } 
      `}</style>}
    </span>
  );
};

export default SubmitButton;
