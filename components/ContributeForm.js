import React, { Component } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import campaign from "../ethereum/campaign";
import { Router } from "../routes"

class ContributeForm extends Component {

    state = {
        value: "",
        errorMessage: "",
        loading: false
    }

    onSubmit = async event => {
    
        event.preventDefault();
        const campaignContract = campaign(this.props.address);
        this.setState({ loading: true});

        try{

            const accounts = await web3.eth.getAccounts();
            await campaignContract.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.value, "ether")
            });

            Router.replaceRoute(`/campaign/${this.props.address}`);

        } catch(err){
            this.setState({ errorMessage: err.message });
        }

        this.setState({ loading: false , value: ""});

      
    }

    render() {
        return <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>

            <Form.Field>
                <label> Amount to Contribute</label>
                <Input
                    label="ether"
                    labelPosition="right"
                    value={this.state.value}
                    onChange={e => this.setState({ value: e.target.value })}
                />
            </Form.Field>
            <Message error header="Oops!" content={this.state.errorMessage} />
            <Button loading={this.state.loading} type="submit" primary> Contribute! </Button>
        </Form>
       
        

    }

}


export default ContributeForm;