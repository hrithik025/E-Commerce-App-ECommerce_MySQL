import { Repository } from "@/server/lib/Repository";

const sampleUsers = [
    {
        "FirstName": "Alice",
        "LastName": "Johnson",
        "PhoneNumber": "9876543210",
        "Email": "alice.johnson@example.com",
        "Password": "SecurePass123"
    },
    {
        "FirstName": "Priya",
        "LastName": "Verma",
        "PhoneNumber": "8976543211",
        "Email": "priya.verma@email.com",
        "Password": "StrongPwd456"
    },
    {
        "FirstName": "Rahul",
        "LastName": "Kumar",
        "PhoneNumber": "7890123456",
        "Email": "rahul.kumar@email.com",
        "Password": "MySecret789"
    },
    {
        "FirstName": "Anika",
        "LastName": "Gupta",
        "PhoneNumber": "6789012345",
        "Email": "anika.gupta@email.com",
        "Password": "PassPhrase007"
    },
    {
        "FirstName": "Vikram",
        "LastName": "Singh",
        "PhoneNumber": "5678901234",
        "Email": "vikram.singh@email.com",
        "Password": "ComplexPw2023"
    }
]

export async function CreateUsers() {
    for (let i = 0; i < sampleUsers.length; i++) {
        const sampleUser = sampleUsers[i];
        const user = Repository.CreateUser();
        user.FirstName = sampleUser.FirstName;
        user.LastName = sampleUser.LastName;
        user.PhoneNumber = sampleUser.PhoneNumber;
        user.Email = sampleUser.Email;
        user.Password = sampleUser.Password;
        user.IsActive = true;

        user.SetEncryptedPassword();
        await user.Save();
    }
}