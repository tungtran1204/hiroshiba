// src/components/molecules/ProfileForm.jsx
import React from "react";
import InputField from "../atoms/InputField";
import TextAreaField from "../atoms/TextAreaField";
import Button from "../atoms/Button";

const ProfileForm = ({ formData, handleChange, handleSubmit, handleReset }) => {
  return (
    <form onSubmit={handleSubmit}>
      <InputField
        label="First Name"
        id="firstName"
        value={formData.firstName}
        onChange={handleChange}
        placeholder="Enter the first name"
      />
      <InputField
        label="Last Name"
        id="lastName"
        value={formData.lastName}
        onChange={handleChange}
        placeholder="Enter the last name"
      />
      <InputField
        label="Email"
        id="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="your_email@example.com"
        readOnly
      />
      <InputField
        label="Phone"
        id="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Enter your phone number"
      />
      <TextAreaField
        label="Description"
        id="description"
        value={formData.description}
        onChange={handleChange}
      />
      <div>
        <Button type="submit" text="Submit" className="btn-primary me-2" />
        <Button
          type="button"
          text="Reset"
          className="btn-secondary"
          onClick={handleReset}
        />
      </div>
    </form>
  );
};

export default ProfileForm;
