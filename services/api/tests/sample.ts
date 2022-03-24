import { UserEntity } from '../src/entity/user'

export type SampleDataFormat = {
    userToSave: UserEntity,
    userToUpdate: UserEntity,
}

export function getSampleData() : SampleDataFormat {
    const userToSave: UserEntity = new UserEntity()
    userToSave.id = 1
    userToSave.name = 'John Doe Dozzy'
    userToSave.email = 'johndoe@gmail.com'
    userToSave.password = 'johndoedozzy'
    
    const userToUpdate: UserEntity = new UserEntity()
    userToSave.id = 1
    userToUpdate.name = 'Big Grizzly Bear'
    userToUpdate.email = 'grizzlybear99@gmail.com'
    userToUpdate.password = 'grizzlywizzly'
    
    return {
        userToSave,
        userToUpdate,
    }
};
