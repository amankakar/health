var DoctorContract = artifacts.require("Doctor");
module.exports = async (deployer, accounts) => {
  await deployer.deploy(DoctorFactory).then(() => {
    //  console.log("Address:", PatientFactory.address);
  });

  var doctorContract = await DoctorFactory.deployed();

  var manager = await doctorContract.manager.call();
  console.log("MAnager", manager);
  // .then(() => {
  //   console.log("Factory Patient adress:", PatientFactory.address);
  // });
  // console.log(PatientFactory.address);
  var rec = await deployer.deploy(
    DoctorContract(1, "AMAN", "Male", "FCPS", accounts)
  );
  //   .then(() => {
  //     console.log("PAteint Address:", PatientContract.address);
  //   });
  var doctor = await DoctorContract.deployed();
  // .then(() => {
  //   console.log("Patient:", PatientContract.address);
  // });
  // const patientG = await patient.patientGender.call();
  // console.log("Gender:", patientG);
};
