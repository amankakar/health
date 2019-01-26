const PatientFactory = artifacts.require("./PatientFactory.sol");
const PatientContract = artifacts.require("./Patient.sol");
//const web3 = artifacts.require("../ethereum/web3");
contract("Patient", accounts => {
  let factoryInstance;
  let patientInstance;
  let rec;
  //beforeEach(async () => {});

  it("it deploys Patient factory contract and add patient ", async () => {
    // console.log(
    //   "call to function",

    factoryInstance = await PatientFactory.deployed();
    console.log("instance:", factoryInstance.address);
    //patientInstance = await PatientContract.deployed();
    rec = await factoryInstance.addPatient(1, "AMAN", "Male", 25, accounts[0], {
      from: accounts[0]
    });

    const address = await factoryInstance.accountToAddress.call(accounts[0]);
    const paid = await factoryInstance.patientId.call(0);
    console.log("Patient id :", paid);
    console.log("address of patient contract:", address);
    const address1 = await factoryInstance.patientIdToAddress.call(1);
    console.log("address vi id:", address1);
    var patient = await PatientContract.at(address);
    const patientName = await patient.patientName.call();
    const summary = await patient.getSummary.call(1);
    console.log("Patient Summary:", summary);
    assert.equal("AMAN", patientName);
    console.log("Factory Patient address", rec);
  });
  it("it deploys Patient contract and retuen patient contract address by calling via patinetid ", async () => {
    // console.log(
    //   "call to function",

    const factoryInstance = await PatientFactory.deployed();
    console.log("instance:", factoryInstance.address);
    //patientInstance = await PatientContract.deployed();
    rec = await factoryInstance.addPatient(1, "AMAN", "Male", 25, accounts[0], {
      from: accounts[0]
    });

    const address = await factoryInstance.patientIdToAddress.call(1);
    var patient = await PatientContract.at(address);
    const patientId = await patient.patientId.call();
    const patientName = await patient.patientName.call();
    const summary = await patient.getSummary.call(1);
    console.log("Patient Summary:", summary);
    assert.equal("AMAN", patientName);
    assert.equal(1, patientId);
    console.log("Factory Patient address", rec);
  });
});
