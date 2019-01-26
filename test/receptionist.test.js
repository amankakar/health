const ReceptionsitFactory = artifacts.require("./ReceptionsitFactory.sol");
const ReceptionsitContract = artifacts.require("./Receptionsit.sol");
contract("Receptionist", accounts => {
  let factoryInstance;
  let receptionistInstance;
  let rec;
  //beforeEach(async () => {});

  it("it deploys receptionist contract and provide ", async () => {
    // console.log(
    //   "call to function",

    factoryInstance = await ReceptionsitFactory.deployed();

    //receptionistInstance = await ReceptionsitContract.deployed();
    rec = await factoryInstance.createReceptionist(
      "MAYO",
      "AMAN",

      {
        from: accounts[0]
      }
    );
    var address = await factoryInstance.accountToAddress.call(accounts[0]);
    var receptionist = await ReceptionsitContract.at(address);
    const manager = await receptionist.manager.call();
    console.log("Address", address);
    console.log(":manager", manager);
    console.log("accounts[0]", accounts[0]);
    console.log("Summary", await receptionist.getSummary.call());
    console.log("Name", await receptionist.receptionistName.call());
    console.log("Contract", receptionist.address);
    assert.equal(accounts[0], manager);
    assert.equal(
      await factoryInstance.newReceptionist.call(),
      await factoryInstance.accountToAddress.call(accounts[0])
    );
    console.log("Factory address", factoryInstance.address);
  });

  it("it checks Recetionist contract", async () => {
    const factoryInstance = await ReceptionsitFactory.deployed();

    //  receptionistInstance = await ReceptionsitContract.deployed();
    const rec = await factoryInstance.createReceptionist("MAYO", "AMAN", {
      from: accounts[0]
    });
    var address = await factoryInstance.accountToAddress.call(accounts[0]);
    var receptionist = await ReceptionsitContract.at(address);
    const manager = await receptionist.manager.call();
    console.log("Address", address);
    console.log(":manager", manager);
    console.log("accounts[0]", accounts[0]);
    console.log("Summary", await receptionist.getSummary.call());
    console.log("Name", await receptionist.receptionistName.call());
    console.log("Contract", receptionist.address);
    assert.equal(accounts[0], manager);
  });
});
