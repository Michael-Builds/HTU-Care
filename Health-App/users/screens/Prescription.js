import React, { useState } from 'react';
import { View, TextInput, Picker, Button } from 'react-native';

const PrescriptionForm = () => {
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [patientGender, setPatientGender] = useState('');
  const [patientContact, setPatientContact] = useState('');
  const [patientAddress, setPatientAddress] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [prescriptionDate, setPrescriptionDate] = useState('');
  const [medications, setMedications] = useState('');
  const [dosageInstructions, setDosageInstructions] = useState('');
  const [frequency, setFrequency] = useState('');
  const [duration, setDuration] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');

  const handleSubmit = () => {
    // Handle form submission here
    // You can send the form data to the server or perform other actions
  };

  return (
    <View>
      <TextInput
        placeholder="Patient Name"
        value={patientName}
        onChangeText={setPatientName}
      />
      <TextInput
        placeholder="Patient Age"
        value={patientAge}
        onChangeText={setPatientAge}
        keyboardType="numeric"
      />
      <Picker
        selectedValue={patientGender}
        onValueChange={(value) => setPatientGender(value)}
      >
        <Picker.Item label="Select Gender" value="" />
        <Picker.Item label="Male" value="male" />
        <Picker.Item label="Female" value="female" />
      </Picker>
      <TextInput
        placeholder="Patient Contact Number"
        value={patientContact}
        onChangeText={setPatientContact}
        keyboardType="phone-pad"
      />
      <TextInput
        placeholder="Patient Address"
        value={patientAddress}
        onChangeText={setPatientAddress}
        multiline
      />

      <TextInput
        placeholder="Prescribing Doctor"
        value={doctorName}
        onChangeText={setDoctorName}
      />
      <TextInput
        placeholder="Date of Prescription"
        value={prescriptionDate}
        onChangeText={setPrescriptionDate}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Prescription Medications"
        value={medications}
        onChangeText={setMedications}
        multiline
      />
      <TextInput
        placeholder="Dosage Instructions"
        value={dosageInstructions}
        onChangeText={setDosageInstructions}
        multiline
      />
      <TextInput
        placeholder="Frequency"
        value={frequency}
        onChangeText={setFrequency}
      />
      <TextInput
        placeholder="Duration"
        value={duration}
        onChangeText={setDuration}
      />
      <TextInput
        placeholder="Additional Notes"
        value={additionalNotes}
        onChangeText={setAdditionalNotes}
        multiline
      />

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default PrescriptionForm;
