# Boilermake 2017

### website endpoint docs:
    "/"
       GET
           returns index.html
    "/puck/:id"
       GET
           get a puck with id
       POST
           create a new puck. takes a label as param
       PUT
           update the label of a puck. takes label as param
       DELETE
           delete a puck