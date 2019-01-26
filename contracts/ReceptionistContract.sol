// contract Receptionsit{
//
//      struct Appointement{
//             uint appointementId;
//             uint patientId;
//             uint doctorId;
//             string date;
//             string chepComplaint;
//         }
//
//         mapping(uint => Appointement) public appointements;
//
//     uint public date;
//     address public manager;
//     string public hospitalName;
//     string public receptionistName;
//     Patient patient;
//
//     constructor (string _hospitalName, string _receptionistName , address _manager) public {
//         hospitalName = _hospitalName;
//         receptionistName = _receptionistName;
//         manager = _manager;
//
//     }
//
//     modifier restricted{
//         require(msg.sender == manager);
//         _;
//     }
//
//     function getManager() public returns(address){
//         return(manager);
//     }
//
//     function getSummary()public view returns(string , string , address ){
//         return(hospitalName , receptionistName , manager);
//     }
//
// }
