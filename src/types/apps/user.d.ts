

export const Gender: {
    MALE: 'MALE',
    FEMALE: 'FEMALE'
};

export type Gender = (typeof Gender)[keyof typeof Gender]


/**
 * Model User
 * 
 */
export type User = {
    id: string
    email: string | null
    username: string | null
    password: string
    first_name: string | null
    last_name: string | null
    phone: string | null
    profile_picture: string | null
    gender: Gender | null
    status: boolean | null
    isAccepted: boolean | null
    isVerified: boolean | null
    isActive: boolean | null
    isDeleted: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    roleId: string | null
}

export const RoleCode: {
    SUPER_ADMIN: 'SUPER_ADMIN',
    COMPANY_ADMIN: 'COMPANY_ADMIN',
    ADMIN: 'ADMIN',
    MANAGER: 'MANAGER',
    INSPECTOR: 'INSPECTOR'
};

export type RoleCode = (typeof RoleCode)[keyof typeof RoleCode]


