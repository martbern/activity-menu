import React , {Component} from "react";
import Airtable from 'airtable-node'

const Log = new Airtable({apiKey: 'keywMvCl7aRV4a5af'})
    .base('appMcSmdPtPWcBhIX')
    .table('Log')

class Todo extends Component {
    fin = () => {
        var element = document.getElementById(this.props.id);
        element.style.opacity = "0.1";

        Log.update(this.props.id, {"Fin": true}).then(resp => {
            console.log("Mark as fin " + this.props.id)
            console.log(resp)
            
            element.style.borderColor = "red";
        })
    }

    propose = () => {
        var element = document.getElementById(this.props.id);
        element.style.opacity = "0.2";
        
        Log.create(
            {"fields": {
                "What?": [this.props.id],
                "Context": "Leisure",
                "Group #": 5
            }}
        ).then(resp => {
            console.log(resp)
            console.log("Concluded? " + this.props.concluded)
            
            element.style.borderColor = "yellow";
        })
    }

    /* let atHref = "https://airtable.com/tblo6SQZQakNq4URH/viwd4XwZ1wC8esYgg" + this.props.id; */

    openInAt = () => {
        console.log("Opening in Airtable")
        window.open("https://airtable.com/tblo6SQZQakNq4URH/viwd4XwZ1wC8esYgg/" + this.props.id)
    }
    
    render() {
        return (
        <div>
            <a href = {this.href} className="shadow-md hover:shadow-lg active:border-gray-500 group block rounded-lg p-4 border hover:border-gray-200 m-2 text-left justify-left text-justify" id={this.props.id}>
                <div className="p-3 grid">
                    <div className="font-medium text-black text-xl pb-2">{this.props.name}</div>
                </div>
                <div className="grid grid-cols-3">
                    <button onClick={() => this.propose()}
                            className= "rounded-lg px-2 py-1 border active:border-gray-500 m-2 text-center focus:outline-none shadow hover:shadow-md active:shadow-sm"
                        >
                            Propose
                    </button>

                    <button onClick={() => this.fin()}
                            className= "rounded-lg px-2 py-1 border active:border-gray-500 m-2 text-center focus:outline-none shadow hover:shadow-md active:shadow-sm"
                        >
                            Fin
                    </button>

                    <button onClick={() => this.openInAt()}
                            className= "rounded-lg px-2 py-1 border active:border-gray-500 m-2 text-center focus:outline-none shadow hover:shadow-md active:shadow-sm"
                        >
                            Airtable
                    </button>
                </div>
            </a>
                
        </div>
        );
    }
}

export default Todo