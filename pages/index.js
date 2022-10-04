import React, { Component } from "react";
import { Button, Card } from "semantic-ui-react";
import factory from "../ethereum/factory";
import Layout from "../components/layout";
import { Link } from "../routes";

class CampaignIndex extends Component {
    static async getInitialProps() {
        const campaigns = await factory.methods.getDeployedContract().call();

        return { campaigns };
    }

    renderCampaigns() {
        const items = this.props.campaigns.map(address => {
            return {
                header: address,
                description: (
                    <Link route={`campaign/${address}`} >
                        <a>View Campaign</a>
                    </Link>
                ),
                fluid: true
            };
        });

        return <Card.Group items={items} />
    }

    render() {
        return <Layout>

            <div>

                <h3 style={{ marginLeft: "9px" }}>Open Campaigns</h3>
                <Link route="/campaign/new" >
                    <a>
                        <Button floated="right" style={{ margin: "10px" }} content='Create Campaign' icon='add' primary />
                    </a>
                </Link>

                {this.renderCampaigns()}

            </div>
        </Layout>;
    }
}
export default CampaignIndex;

