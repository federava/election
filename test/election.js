var Election = artifacts.require("./Election.sol");

contract("Election", function(accounts) {
    var electionInstance; // scope inside all the promise chain

    // Testing that there are two candidates initialized
    it("initializes with two candidates", function() { // "it" and "contract" we get it from Mocha testing framework
        return Election.deployed().then(function(instance) {
            return instance.candidatesCount(); // voy a buscar una instancia del contrato asincronicamente
        }).then(function(count) { // como el count tambien es asincronico, hago una chain, pare eso uso el then
            assert.equal(count, 2); // "assert" comes from Chai, this assertion checks that the amount is 2
        });
    });

    // Repito el mismo test pero con otra sintaxis
    it("same test as the other", async () => {
        let instanciaEleccion = await Election.deployed();
        let cantidadCandidatos = await instanciaEleccion.candidatesCount();
        assert.equal(cantidadCandidatos.toString(), '2');
    })

    // Test that the parameters of the structs are correct
    it("it initializes the candidates with the correct values", function() {
        return Election.deployed().then(function(instance) {
            electionInstance = instance;
            return electionInstance.candidates(1);
        }).then(function(candidate) {
            assert.equal(candidate[0], 1, "contains the correct id");
            assert.equal(candidate[1], "Candidate 1", "contains the correct name");
            assert.equal(candidate[2], 0, "contains the correct votes count");
            return electionInstance.candidates(2);
        }).then(function(candidate) {
            assert.equal(candidate[0], 2, "contains the correct id");
            assert.equal(candidate[1], "Candidate 2", "contains the correct name");
            assert.equal(candidate[2], 0, "contains the correct votes count");
        });
    });

    // Test that the parameters of the structs are correct (the vote goes up by 1 and it adds the voter to the mapping)
    it("The voting function is working", function() {
        return Election.deployed().then(function(instance) {
            electionInstance = instance;
            return electionInstance.candidates(1);
        }).then(function(candidate) {
            assert.equal(candidate[0], 1, "contains the correct id");
            assert.equal(candidate[1], "Candidate 1", "contains the correct name");
            assert.equal(candidate[2], 0, "contains the correct votes count");
            return electionInstance.candidates(2);
        }).then(function(candidate) {
            assert.equal(candidate[0], 2, "contains the correct id");
            assert.equal(candidate[1], "Candidate 2", "contains the correct name");
            assert.equal(candidate[2], 0, "contains the correct votes count");
        });
    });    
});