class AddNameAndPostalCodeToUsers < ActiveRecord::Migration
  def change
    add_column :users, :name, :string
    add_column :users, :postalcode, :string
  end
end
