export interface IAdmin {
    name: string;
    email: string;
    profileImage?: string;
    contactNumber?: string;
    isDeleted?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IAdminUpdate extends Partial<IAdmin> {
    id: string;
}
