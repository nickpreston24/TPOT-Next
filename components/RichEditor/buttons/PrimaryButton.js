import { Button } from '@material-ui/core'




const PrimaryButton = props => {

  const palette = props.palette

  // if(!palette)
  //   throw new Error("Missing a color palette!");

  const toggle = props.onToggle || function () { } // for the strange case where this is null.
  const style = props.style

  // console.log(toggle, style)

  const onToggle = event => {
    event.preventDefault()
    toggle(style)
  }

  let className = 'RichEditor-styleButton'

  if (props.active) {
    className += ' RichEditor-activeButton'
  }

  return (
    <span className={className} onMouseDown={onToggle}>
      <button onClick={props.onClick}>{props.children || props.label}</button>
      {pallete && <style jsx>{`
        button{
            border: "2px solid" + ${pallete.primary.teal};
            color:${pallete.primary.blue};
            background-color:${pallete.primary.white};
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
            background-color:${pallete.secondary.eggshell};
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
  )




  // return (
  //   <Button onClick={props.onClick}>{props.children || props.label}</Button>
  //   );
  {/* <span className={className} onMouseDown={onToggle}>
      <button onClick={props.onClick}>{props.children || props.label}</button>
      <style jsx>{
        
        `button{
            border: "2px solid" + ${palette.primary.teal};
            color:${palette.primary.blue};
            background-color:${palette.primary.white};
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
            background-color:${palette.secondary.eggshell};
            border-color: ${palette.primary.blue}
          }
          @media all and (max-width:30em){
           button{
            display:block;
            margin:0.2em auto;
           }
          } `
        `
        button{
            border: "2px solid" + ${palette.primary.teal};
            color:${palette.primary.blue};
            background-color:${palette.primary.white};
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
            background-color:${palette.secondary.eggshell};
            border-color: ${palette.primary.blue}
          }
          @media all and (max-width:30em){
           button{
            display:block;
            margin:0.2em auto;
           }
          } 
      `}</style>
    </span> */}
}


export default PrimaryButton

