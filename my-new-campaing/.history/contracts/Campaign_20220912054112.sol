// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0 <0.9.0;

contract CampaignFactory{
address[] public deployedCampains;

event campaignCreated( 
    
    string title,
    uint requiredAmount,
    address indexed owner, 
    address campaignAddress,
    string imageURI,
    uint indexed timestamp,
    string indexed category
); 

    function createCampaign(
        string memory campaingTitle,
        uint requiredCompaignAmount,
        string memory imageURI,
        string memory category,
        string memory storyURI) public
    {
        Campaing newCampaign=new Campaing(
        campaingTitle,
        requiredCompaignAmount,
        imageURI,
        storyURI,
        msg.sender
        );
        deployedCampains.push(address(newCampaign));
        emit campaignCreated(
            campaingTitle,
            requiredCompaignAmount,
            msg.sender,
            address(newCampaign),
            imageURI,
            block.timestamp,
            category
            );
    }
}

contract Campaing{
    string public title;
    uint public requiredAmount;
    string public image;
    string public story;
    // basically address is an datatype in solidity that hold wallet address
    address payable public owner;
    uint public receivedAmount;
// indexed is used to filter ,when we will working on frontend 
// in time stamp we will receive time and data
    event donated(address indexed donar,uint indexed amount,uint indexed timeStamp );
    constructor(
        string memory campaingTitle,
        uint requiredCompaignAmount,
        string memory imageURI,
        string memory storyURI,
        address campaignOwner
    )
    {
        title=campaingTitle;
        requiredAmount=requiredCompaignAmount;
        image=imageURI;
        story=storyURI;
        owner=payable(campaignOwner); // 
    }
    function donate() public payable{
        require(requiredAmount>receivedAmount,"REQUIRED AMOUNT FULFILLED");// if it is true then run the function
        // if value will be false then it will show message
        owner.transfer(msg.value);
        receivedAmount+=msg.value;
        emit donated(msg.sender,msg.value,block.timestamp); // block is an global variable // it will give time stamp current time 
        
    }

}


