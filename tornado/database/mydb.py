class MyDB:
    def __init__(self,userdb_path):
        self.users = []

        with open(userdb_path) as user_record:
            for user in user_record:
                print("user:",user)
                user = user[:-1]
                self.users.append(user.split(' @@ '))
                print("users:",self.users)

    def get_user(self,user_id):
        print('have user_id,',user_id)
        for user in self.users:
            print(user[0])
            if int(user[0]) == int(user_id):
                return user
        return None

    def get_user_by_np(self,n,p):
        print("n:%s,p:%s" % (n,p))
        user = None
        for u in self.users:
            if u[2] == n and u[3] == p:
                user = u
                break
        print("user",user)
        return user

    def insert_user(self,user):
        self.users.append(user)
        for user in self.users:
            print("user:",user)
