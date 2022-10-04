import React, { Component } from "react";
import { Card, Grid } from "semantic-ui-react";
import Layout from "../../components/layout";
import Campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";

class CampaignShow extends Component {

    static async getInitialProps(props) {
        const campaignContract = Campaign(props.query.address);
        const summary = await campaignContract.methods.getSummary().call();

        return {
            address: props.query.address,
            minimumContribution: summary[0],
            balance: summary[1],
            requestsCount: summary[2],
            approversCount: summary[3],
            manager: summary[4]
        };
    }

    renderCard() {
        const { minimumContribution, balance, requestsCount, approversCount, manager } = this.props;

        const items = [
            {
                header: manager,
                meta: "Address of Manager",
                description: "The Manager created this Campaign",
                style: { overflowWrap: "break-word" }
            },
            {
                header: minimumContribution,
                meta: "Minimum Contribution in Wei",
                description: " Approvers must contribute this much of wei",
                style: { overflowWrap: " break-word" }
            },
            {
                header: requestsCount,
                meta: "Number of Request",
                description: " A request tries to withdraw money from campaign",
                style: { overflowWrap: " break-word" }
            },
            {
                header: approversCount,
                meta: " Numbers of approvers",
                description: " Number of people who have already donated to this campaign",
                style: { overflowWrap: " break-word" }
            },
            {
                header: web3.utils.fromWei(balance, "ether"),
                meta: "Campaign Balance (Ether) ",
                description: "This balance is how much money the campaign can spend"

            }
        ];

        return <Card.Group items={items} />
    }



    render() {
        return <Layout>
            <h3> Campaign Show </h3>
            <Grid>
                <Grid.Column width={10}>
                    {this.renderCard()}
                </Grid.Column>

                <Grid.Column width={6} >
                    <ContributeForm  address={this.props.address}/>
                </Grid.Column>
            </Grid>



        </Layout>
    };
}

export default CampaignShow;