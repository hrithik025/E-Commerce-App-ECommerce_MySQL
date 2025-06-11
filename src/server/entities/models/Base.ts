type BaseEntity = { Id: bigint, CreatedTime: Date, UpdatedTime: Date | null };

export abstract class Base<EEntity> {
    private static IdCounter: bigint = BigInt(0);

    Id!: bigint;
    CreatedTime!: Date;
    UpdatedTime!: Date | null;

    constructor(data?: BaseEntity | null) {
        if (data === undefined || data === null) {
            this.InitializeBase();
        } else {
            this.AssignBaseValues(data);
        }
    }

    private InitializeBase() {
        this.Id = Base.IdCounter--;
        this.CreatedTime = new Date();
        this.UpdatedTime = null;
        this.Initialize();
    }

    private AssignBaseValues(data: BaseEntity) {
        this.Id = data.Id;
        this.CreatedTime = data.CreatedTime;
        this.UpdatedTime = data.UpdatedTime;
    }

    protected GetPersistenceData() {
        const newObj = { ... this };
        const keysToRemove = ["Id", "CreatedTime", "UpdatedTime"];

        keysToRemove.forEach(key => {
            delete newObj[key as keyof BaseEntity];
        });

        return newObj;
    }

    public get IsNew(): boolean { return this.Id <= 0 };
    public get IsEdit(): boolean { return this.Id > 0 };

    protected abstract Initialize(): void;
    protected abstract AssignValues(data: EEntity): void;
}