import './App.css';
import { useQuill } from 'react-quilljs'
import 'quill/dist/quill.snow.css'
import { useEffect, useState } from 'react';

function App() {
  const { quill, quillRef } = useQuill();
  const [htmlCode, setHtmlCode] = useState("")
  const [control, setControl] = useState(false)

  useEffect(()=>{
    if(quill){
      quill.on('text-change',()=>{
        setHtmlCode(quillRef.current.firstChild.innerHTML)
      })
    }
  },[quill])

  useEffect(()=>{
    if(quill && !control){
      quill.clipboard.dangerouslyPasteHTML('<h1>Hello world!</h1>')
      setControl(true)
    }
  },[quill])


  return (
    <div className="App">
      <h1>Convertendo texto em código html com ReactQuilljs</h1>
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-evenly', width:'100%'}}>
        <div style={{ width: '500px', height: '300px' }}>
          <div ref={quillRef}/>
        </div>
        <div style={{ width: '500px', height: '300px', flexWrap:'wrap' }}>
          <h3>Visualização do código HTML5</h3>
          <div style={{width: '100%', height: '100%', flexWrap:'wrap', overflowY:'scroll', border:'1px solid black'}}>
            {htmlCode}
          </div>
        </div>
      </div>
      <div style={{marginTop:'5rem'}}>
        <div dangerouslySetInnerHTML={{__html:htmlCode}} />
      </div>
    </div>
  );
}

export default App;
