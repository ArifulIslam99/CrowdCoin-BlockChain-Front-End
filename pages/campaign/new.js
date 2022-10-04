import React, { Component } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";
import Layout from "../../components/layout";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { Router } from "../../routes";

class CampaignNew extends Component {

    state = {
        minimumContibution: "",
        errorMessage: "",
        loading: false
    }


    onSubmit = async (event) => {
        this.setState({ loading: true, errorMessage: ""})
        event.preventDefault();
        try{
        const accounts = await web3.eth.getAccounts();
        await factory.methods.createCampaign(this.state.minimumContibution)
        .send(
            {
                from: accounts[0]
            }
        );
        Router.pushRoute("/");
    } catch(err){

            this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false
    })
    } 
    render() {
        return <Layout>
            <h1> Lets Create a New Campaign</h1>

            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Form.Field>
                    <label> Minimum Contribution</label>
                    <Input
                        label="wei"
                        labelPosition="right"
                        value={this.state.minimumContibution}
                        onChange={e => this.setState({ minimumContibution: e.target.value })}
                    />
                </Form.Field>
                <Message error header="Oops!" content={this.state.errorMessage} />
                <Button loading={this.state.loading} type="submit" primary> Create! </Button>
            </Form>
        </Layout>
    }
}

export default CampaignNew;