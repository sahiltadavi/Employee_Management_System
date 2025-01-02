import { useState } from 'react'
import './App.css'

function App() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    name: '',
    dob: '',
    contact: '',
    email: '',
    address: '',
    department: '',
    designation: '',
    salary: '',
  });
  const [search, setSearch] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  const validateForm = () => {
    const errors = [];
    if (!form.name || form.name.length < 3 || form.name.length > 50 || !/^[A-Za-z ]+$/.test(form.name)) {
      errors.push('Name must be 3-50 characters long and only contain alphabets and spaces.');
    }
    const dobDate = new Date(form.dob);
    if (!form.dob || dobDate >= new Date()) {
      errors.push('DOB must be a valid past date.');
    }
    if (!form.contact || !/^\d{10}$/.test(form.contact)) {
      errors.push('Contact must be exactly 10 digits.');
    }
    if (!form.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      errors.push('Email must be valid.');
    }
    if (!form.address) {
      errors.push('Address is required.');
    }
    if (!form.department) {
      errors.push('Department is required.');
    }
    if (!form.designation) {
      errors.push('Designation is required.');
    }
    if (!form.salary || isNaN(form.salary) || Number(form.salary) <= 0) {
      errors.push('Salary must be a positive number.');
    }
    if (errors.length) {
      alert(errors.join('\n'));
      return false;
    }
    return true;
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (editingIndex !== null) {
      const updatedEmployees = [...employees];
      updatedEmployees[editingIndex] = form;
      setEmployees(updatedEmployees);
      setEditingIndex(null);
    } else {
      setEmployees([...employees, form]);
    }
    setForm({ name: '', dob: '', contact: '', email: '', address: '', department: '', designation: '', salary: '' });
  };

  const handleEdit = (index) => {
    setForm(employees[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      setEmployees(employees.filter((_, i) => i !== index));
    }
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(search.toLowerCase())
  );
  
  return (
    <div className="App">
      <h1 className='Heading'>Employee Management</h1>

      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="name"
          value={form.name}
          placeholder="Name"
          onChange={handleInputChange}
        />

        <br />
        <input
          type="date"
          name="dob"
          value={form.dob}
          placeholder="Date of Birth"
          onChange={handleInputChange}
        />
        <br />
        <input
          type="text"
          name="contact"
          value={form.contact}
          placeholder="Contact"
          onChange={handleInputChange}
        />
        <br />
        <input
          type="email"
          name="email"
          value={form.email}
          placeholder="Email"
          onChange={handleInputChange}
        />
        <br />
        <textarea
          name="address"
          value={form.address}
          placeholder="Address"
          onChange={handleInputChange}
        ></textarea>
        <br />
        <input
          type="text"
          name="department"
          value={form.department}
          placeholder="Department"
          onChange={handleInputChange}
        />
        <br />
        <input
          type="text"
          name="designation"
          value={form.designation}
          placeholder="Designation"
          onChange={handleInputChange}
        />
        <br />
        <input
          type="number"
          name="salary"
          value={form.salary}
          placeholder="Salary"
          onChange={handleInputChange}
        />
        <br />
        <button type="submit" className='sub'>{editingIndex !== null ? 'Update' : 'Add'} Employee</button>
      </form>

      <input
        type="text"
        value={search}
        placeholder="Just Enter a name to Search..."
        onChange={(e) => setSearch(e.target.value)}
        className='sear'
      />
      <table border={''}>
        <thead>
          <tr>
            <th>Name</th>
            <th>DOB</th>
            <th>Contact</th>
            <th>Email</th>
            <th>Address</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee, index) => (
            <tr key={index}>
              <td>{employee.name}</td>
              <td>{employee.dob}</td>
              <td>{employee.contact}</td>
              <td>{employee.email}</td>
              <td>{employee.address}</td>
              <td>{employee.department}</td>
              <td>{employee.designation}</td>
              <td>{employee.salary}</td>
              <td>
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;


