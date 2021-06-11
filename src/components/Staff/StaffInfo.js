import React from 'react';
import PropTypes from 'prop-types';

export default function StaffInfo({ role, staffMembers }) {
    return (
        staffMembers
        ? staffMembers.filter(member => member.role.includes(role))
            .map(filteredMember => (
                <div className="member-info" key={filteredMember.email}>
                    <i className="bi bi-person-fill"></i> { filteredMember.firstName} { filteredMember.lastName}
                </div>
            ))
        : null
    );
}

StaffInfo.propTypes = {
    role: PropTypes.string.isRequired,
    member: PropTypes.object
}
