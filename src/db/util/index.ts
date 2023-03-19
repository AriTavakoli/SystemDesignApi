const mongoose = require('mongoose');


class ExtendedCollection extends mongoose.Collection {

  public async createCustomIndex(index: object): Promise<void> {
    try {
      await this.createIndex(index);
      console.log('Index created successfully:', index);
    } catch (error) {
      console.error('Error while creating the index:', error);
    }
  }

}

export default ExtendedCollection