import React from 'react';
import PropTypes from 'prop-types';

export default function StaffInfo({role, staffMembers}) {
    return (
        <div>
            {
                staffMembers?.filter(member => member.role.includes(role))
                    .map(filteredMember => (
                        <div className="member-info">
                            { filteredMember.firstName } { filteredMember.lastName }
                        </div>
                    ))
            }
        </div>
    )
}

StaffInfo.propTypes = {
    role: PropTypes.string.isRequired,
    member: PropTypes.object
}