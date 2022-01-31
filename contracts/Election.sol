pragma solidity 0.5.16;

contract Election {
    
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    mapping (uint => Candidate) public candidates;

    mapping (address => bool) public voters;

    uint public candidatesCount;

    // Constructor
    constructor () public {
        addCandidate("Candidate 1");
        addCandidate("Candidate 2");
    }

    function addCandidate(string memory _name) private { // because we want only the SC to call this function, not anyone from outside
        candidatesCount ++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    function vote(uint _candidateId) public {
        require(voters[msg.sender] == false, "You have already voted");
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Not existing candidate");
        voters[msg.sender] = true;
        candidates[_candidateId].voteCount ++;
    }
}

