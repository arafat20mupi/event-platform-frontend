export interface IHost {
    id?: string;
    name: string;
    email: string;
    bio?: string;
    location?: string;
    contactNumber?: string;
    profileImage?: string | File;
    isVerified?: boolean;
    isDeleted?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    passward?: string;
}

export interface IHostUpdate extends Partial<IHost> {
    id: string;
}