var PatientContract = artifacts.require("Patient");
module.exports = async (deployer, accounts) => {
  await deployer.deploy(PatientFactory).then(() => {
    //  console.log("Address:", PatientFactory.address);
  });

  var patientContract = await PatientFactory.deployed();

  var manager = await patientContract.manager.call();
  console.log("MAnager", manager);
  // .then(() => {
  //   console.log("Factory Patient adress:", PatientFactory.address);
  // });
  // console.log(PatientFactory.address);
  var rec = await deployer.deploy(
    PatientContract("P0001", "AMAN", "Male", 25, accounts)
  );
  //   .then(() => {
  //     console.log("PAteint Address:", PatientContract.address);
  //   });
  var patient = await PatientContract.deployed();
  // .then(() => {
  //   console.log("Patient:", PatientContract.address);
  // });
  const patientG = await patient.patientGender.call();
  console.log("Gender:", patientG);
};
