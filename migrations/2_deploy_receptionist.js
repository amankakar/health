var ReceptionistFactory = artifacts.require("./ReceptionsitFactory.sol");
var ReceptionsitContract = artifacts.require("./Receptionsit.sol");

module.exports = async (deployer, accounts) => {
  await deployer.deploy(ReceptionistFactory).then(() => {
    //console.log("Fatory:", ReceptionsitFactory.address);
  });

  var recetionistContract = await ReceptionistFactory.deployed().then();
  var rec = await deployer.deploy(
    recetionistContract.createReceptionist(ReceptionsitContract, "MAYO", "AMAN")
  );

  // .then(() => {
  //   console.log("Factory Patient adress:", PatientFactory.address);
  // });
  // console.log(PatientFactory.address);
  // await PatientContract.deployed().then(() => {
  //   console.log("Patient:", PatientContract.address);
  // });// var patientContract = await PatientFactory.deployed().then(() => {
  //   console.log("Factory Patient adress:", PatientFactory.address);
  // });
  // await ReceptionsitContract.deployed().then(() => {
  //   console.log("Recetionist:", ReceptionsitContract.address);
  //   console.log(RecetionistContract);
  // });
};
