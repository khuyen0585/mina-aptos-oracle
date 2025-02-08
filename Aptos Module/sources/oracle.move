module mina::oracle{
    use std::signer;

    const ERR_NOT_OWNER: u64 = 1;

    const ADMIN: address = @mina;

    struct OracleData has key, store {
        data: u64,
    }

    public entry fun initialize(admin: &signer) {
        assert!(signer::address_of(admin) == ADMIN, ERR_NOT_OWNER);
        let data = 0;
        move_to(admin, OracleData { data });
    }

    public entry fun push_oracle_data(admin: &signer, data: u64) acquires OracleData {
        assert!(signer::address_of(admin) == ADMIN, ERR_NOT_OWNER);

        let oracle_ref = &mut borrow_global_mut<OracleData>(ADMIN).data;
        *oracle_ref = data;
    }

    #[view]
    public fun get_oracle_data():u64 acquires OracleData{
        let oracle_data = borrow_global_mut<OracleData>(ADMIN);
        return oracle_data.data    
    }


}