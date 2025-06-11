import { Base } from "@server/entities/models/Base";
import { Repository } from "@/server/lib/Repository";
import { User as EUser } from "@prisma/client";
import { SetEncryptedPassword } from "@/server/entities/actions";

export class User extends Base<EUser> {
    UniqueId!: string;
    FirstName!: string;
    LastName!: string;
    PhoneNumber!: string;
    Email!: string;
    Password!: string;
    LastPasswordUpdated!: Date | null;
    LastAccessedTime!: Date | null;
    IsActive!: boolean;
    ActivationDate!: Date | null;
    DeactivationDate!: Date | null;

    constructor(data?: EUser) {
        super(data);
        if (data) {
            this.AssignValues(data);
        }
    }

    public Initialize(): void {
        this.FirstName = "";
        this.LastName = "";
        this.PhoneNumber = "";
        this.Email = "";
        this.Password = "";
        this.LastPasswordUpdated = null;
        this.LastAccessedTime = null;
        this.IsActive = false;
        this.ActivationDate = null;
        this.DeactivationDate = null;
    }

    protected AssignValues(data: EUser): void {
        this.UniqueId = data.UniqueId;
        this.FirstName = data.FirstName;
        this.LastName = data.LastName;
        this.PhoneNumber = data.PhoneNumber;
        this.Email = data.Email;
        this.Password = data.Password;
        this.LastPasswordUpdated = data.LastPasswordUpdated;
        this.LastAccessedTime = data.LastAccessedTime;
        this.IsActive = data.IsActive;
        this.ActivationDate = data.ActivationDate;
        this.DeactivationDate = data.DeactivationDate;
    }

    public async Save() {
        if (this.IsNew) {
            let persistedData = await Repository.Users.create({
                data: this.GetPersistenceData()
            });
            this.Id = persistedData.Id;
        } else {
            let persistedData = await Repository.Users.update({
                where: { Id: this.Id },
                data: this.GetPersistenceData()
            })
            this.Id = persistedData.Id;
        }
    }

    public SetEncryptedPassword() {
        SetEncryptedPassword(this);
    }
}