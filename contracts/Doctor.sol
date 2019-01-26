pragma solidity ^0.4.24;


import "./Receptionist.sol";
import "./Patient.sol";
contract Doctor{

    struct Appointment{
        uint appointmentId;
        uint patientId;
        uint doctorId;
        string date;
        string chiefComplaint;
        string hash;
        bool completed;

    }
    string public doctorName;
    uint public doctorId;
    string public gender;
    string public qualification;
    address public manager;
    address public patientAddress;
    string prescription;

    //patient and factory
    ReceptionsitFactory factory;
    Patient patient;

    uint[] public appointmentsList;
    address factoryAddress;

    mapping(uint=>Appointment) public appointments;

    constructor( uint _doctorId  , string _doctorName, string _gender, string _qualification, address _account){
        doctorName = _doctorName;
        gender = _gender;
        qualification = _qualification;
        manager = _account;
        doctorId = _doctorId;

    }


      function addAppointment(uint _AppointmentId, uint _PatientId , uint _DoctorId , string _Date , string _chiefComplaint) public{
          Appointment memory newAppointment = Appointment({
              appointmentId : _AppointmentId ,
              patientId : _PatientId ,
              doctorId : _DoctorId ,
              date : _Date ,
              chiefComplaint : _chiefComplaint,
              hash : '',
              completed: false


          });

          appointments[_AppointmentId]=newAppointment;

          appointmentsList.push(_AppointmentId);
      }

       function addPrescription(uint _AppointmentId , string hash){

           uint patientId=appointments[_AppointmentId].patientId;
          factory = ReceptionsitFactory(factoryAddress);
        patientAddress=factory.getPatientAddress(patientId);
       patient = Patient(patientAddress);
       patient.addPrescription(_AppointmentId , hash);
       appointments[_AppointmentId].hash=hash;
       appointments[_AppointmentId].completed=true;


       }

      function setFactoryAddress(address fac){
          factoryAddress = fac;
      }

      function getSummary(uint doctorId) public view returns(uint , string, string , string ,  address){
        return(doctorId , doctorName , gender , qualification , manager);
      }
}
