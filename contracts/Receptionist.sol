pragma solidity ^0.4.24;

import "./Doctor.sol";
import "./Patient.sol";
<<<<<<< HEAD
=======
// import "./ReceptionistContract.sol";
>>>>>>> c38b47d679be440ff43ea1a2286041a593dd9707
contract ReceptionsitFactory{
    // struct for reception summary and appointment
   struct ReceptionSummary{
        string hospitalName;
        string receptionistName;
        address manager;
        address contractAddress;

    }

    struct Appointement{
    uint appointementId;
    uint patientId;
    uint doctorId;
    string date;
    string chepComplaint;
  }


        mapping(uint => Appointement) public appointements;
<<<<<<< HEAD
=======
        mapping(uint=>bool) public checkAppointmentId;
>>>>>>> c38b47d679be440ff43ea1a2286041a593dd9707
        ReceptionSummary[] public receptionSummary;
        address public factoryAddress;
        Patient public patient;
        Doctor public doctor;
        address[] public deployedReceptionist;
        mapping (address=>address) public accountToAddress;
        mapping(address => bool) public accountCheck;
        address public newReceptionist ;
        address public manager;
        //for patient
        mapping (address=>address) public accountToAddressPatient;
        mapping (uint => address)  public patientIdToAddress;
        mapping(uint=>bool) public checkPatientId;
        uint[] public patientId;
<<<<<<< HEAD
        address public patientAddress;

        //for Doctor

=======
        // address public patientAddress;

        //for Doctor
>>>>>>> c38b47d679be440ff43ea1a2286041a593dd9707
        mapping (address=>address) public accountToAddressDoctor;
        mapping (uint => address)  public doctorIdToAddress;
        mapping(uint=>bool) public checkDoctorId;
        uint[] public doctorId;


    constructor(){
        factoryAddress  = this;
    }

   function createReceptionist(string _hospitalName, string _name ) public{
       require(!(accountCheck[msg.sender]));
         newReceptionist = new Receptionsit(_hospitalName, _name , msg.sender);
        deployedReceptionist.push(newReceptionist);
        accountToAddress[msg.sender] = newReceptionist;
        accountCheck[msg.sender] = true;

        ReceptionSummary memory newRecetionSummary= ReceptionSummary({
            hospitalName: _hospitalName ,
            receptionistName : _name,
            manager: msg.sender,
            contractAddress : newReceptionist

        })  ;
        receptionSummary.push(newRecetionSummary);
    }

     function getReceptionList() public view returns(uint){
         return receptionSummary.length;
     }

    function getDeployedCompaigns() public view returns(address[]){
        return deployedReceptionist;
    }


   function addPatient(uint _patientId, string _patientName, string _gender, uint _age, address _account) public {
<<<<<<< HEAD
                 require(!checkPatientId[_patientId]);
                 require(!accountCheck[_account]);

          patient = new Patient(_patientId , _patientName , _gender , _age , _account);
          accountToAddressPatient[_account] = patient;
          patientIdToAddress[_patientId] = patient;
         accountCheck[_account]=true;
         patientId.push(_patientId);
        checkPatientId[_patientId]=true;
=======
                 require(!checkPatientId[_patientId] && !accountCheck[_account]);

          patient = new Patient(_patientId , _patientName , _gender , _age , _account);
          accountToAddressPatient[_account] = patient;
        patientIdToAddress[_patientId] = patient;
        patientId.push(_patientId);
        checkPatientId[_patientId]=true;
        accountCheck[_account] = true;
>>>>>>> c38b47d679be440ff43ea1a2286041a593dd9707

    }

    function addDoctor ( uint _DoctorId , string _DoctorName , string _DoctorGender, string _qualification , address _account){
        require(!checkDoctorId[_DoctorId]);
        require(!accountCheck[_account]);
<<<<<<< HEAD

        Doctor doc = new Doctor(_DoctorId , _DoctorName , _DoctorGender , _qualification , _account);
        doctorIdToAddress[_DoctorId]= doc;
        accountToAddressDoctor[_account] = doc;
        accountCheck[_account]=true;
        doctorId.push(_DoctorId);
        checkDoctorId[_DoctorId] = true;
=======
        Doctor doc = new Doctor(_DoctorId , _DoctorName , _DoctorGender , _qualification , _account);
        doctorIdToAddress[_DoctorId]= doc;
        accountToAddressDoctor[_account] = doc;
        doctorId.push(_DoctorId);
        checkDoctorId[_DoctorId] = true;
        accountCheck[_account]=true;
>>>>>>> c38b47d679be440ff43ea1a2286041a593dd9707
        doc.setFactoryAddress(factoryAddress);


    }

    function getPatientList() public view returns(uint){
      return patientId.length;
  }

    function getDoctorList() public view returns(uint){
        return(doctorId.length);
    }


  function createAppointment( uint  _AppointementId, uint _PatientId , uint _DoctorId, string _Date , string _chepComplaint ) public  {
<<<<<<< HEAD

=======
          require(!checkAppointmentId[_AppointementId]);
>>>>>>> c38b47d679be440ff43ea1a2286041a593dd9707
    Appointement memory newAppointement = Appointement({
      appointementId : _AppointementId,
      patientId : _PatientId,
      doctorId : _DoctorId,
      date : _Date,
      chepComplaint: _chepComplaint
    });
    appointements[_AppointementId] = newAppointement;
<<<<<<< HEAD
    patientAddress= getPatientAddress(_PatientId);
=======
    checkAppointmentId[_AppointementId] = true;
    address patientAddress= getPatientAddress(_PatientId);
>>>>>>> c38b47d679be440ff43ea1a2286041a593dd9707
    Patient patient1 = Patient(patientAddress);
    patient1.addAppointment(_AppointementId, _PatientId , _DoctorId , _Date, _chepComplaint);
    address doctorAddress = getDoctorAddress(_DoctorId);
    Doctor doctor = Doctor(doctorAddress);
    doctor.addAppointment(_AppointementId , _PatientId , _DoctorId , _Date , _chepComplaint);

  }


  function getPatientAddress( uint patientId)public view returns (address){
      return(patientIdToAddress[patientId]);
  }

function getDoctorAddress(uint _DoctorId) public view returns(address){
    return (doctorIdToAddress[_DoctorId]);
}
}

contract Receptionsit{

     struct Appointement{
            uint appointementId;
            uint patientId;
            uint doctorId;
            string date;
            string chepComplaint;
        }

        mapping(uint => Appointement) public appointements;

    uint public date;
    address public manager;
    string public hospitalName;
    string public receptionistName;
<<<<<<< HEAD
    Patient patient;
=======
>>>>>>> c38b47d679be440ff43ea1a2286041a593dd9707

    constructor (string _hospitalName, string _receptionistName , address _manager) public {
        hospitalName = _hospitalName;
        receptionistName = _receptionistName;
        manager = _manager;

    }

    modifier restricted{
        require(msg.sender == manager);
        _;
    }

    function getManager() public returns(address){
        return(manager);
    }

    function getSummary()public view returns(string , string , address ){
        return(hospitalName , receptionistName , manager);
    }

}
