const Store = require('electron-store');

class DataStore extends Store{
    constructor(settings){
        super(settings)

        this.passwordData = this.get("passwordData") || [];
    }

    savePassword(){
        this.set("passwordData", this.passwordData)
        return this
    }

    getPassword(){
        this.passwordData = this.get("passwordData") || []
        return this
    };

    addPassword(password){
        this.passwordData = [...this.passwordData, password]
        return this.savePassword()
    };

    deletePassword(password){

        for(var n=0 ; n < this.passwordData.length ; n++){
            if(this.passwordData[n].Description === password){
                var removedObject = this.passwordData.splice(n, 1);
                console.log("Removed Object: ", removedObject);
                removedObject = null;
                break;
            }
        }
        
        return this.savePassword()
    };

}

module.exports = DataStore;