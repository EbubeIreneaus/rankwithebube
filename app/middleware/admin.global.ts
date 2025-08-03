export default defineNuxtRouteMiddleware((to, from) => {
    const cookie = useCookie('Authorization')
    if(to.path.startsWith('/admin') && !to.path.startsWith('/admin/auth')){
        if (!cookie.value) {
            return navigateTo('/admin/auth')
        }
        return
    }
    return
})
