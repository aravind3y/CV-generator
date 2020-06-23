import React from 'react';
import axios from 'axios';
import {saveAs} from 'file-saver';


class App extends React.Component{
    state={
        name:'',
        college:' ',
        board:' ',
        year:0,
    }

    handleChange=({target:{value,name}})=> this.setState({[name]:value})
    CreatePdf=()=>{
        axios.post('/create-pdf',this.state)
        .then(()=>axios.get('/fetch-pdf',{responseType:'blob'}))
        .then((res)=>{
            const pdfBlob=new Blob([res.data],{type:'application/pdf'});
            saveAs(pdfBlob,'document.pdf');
        })
    }

    render(){
        return(
            <div>
                <input type="text" placeholder="Name" name="name" onChange={this.handleChange} />
                <p>Academic Details</p>
                <input type="text" placeholder="College" name="college" onChange={this.handleChange} />
                <input type="text" placeholder="Board" name="board" onChange={this.handleChange} />
                <input type="year" placeholder="year" name="year" onChange={this.handleChange} />
                <button onClick={this.CreatePdf}>
                    Download PDF
                </button>
            </div>
        )
    }
}

export default App;