
/**
 * 自定义 Auth hook
 *
 * @author by.
 * @since 2023/8/2
 */
const useAuth = ():{token:string, setAuth:(token:string) => void, tokenHeader:Record<string, string> } => {
    let token = sessionStorage.getItem("Auth")
    if(token == null){
        token = ""
    }

    const tokenHeader:Record<string, string> = {
        'Auth':token
    }

    return {
        token,
        setAuth(token: string): void {
            sessionStorage.setItem("Auth",token)
        },
        tokenHeader
    }
}

export default useAuth