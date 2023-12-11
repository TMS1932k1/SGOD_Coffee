import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: {
    en: {
      translation: {
        titleOnboarding: 'Coffee so good, your taste buds will love it.',
        subtitleOnboarding:
          'The best grain, the finest roast, the powerful flavor.',
        getStart: 'Get Started',
        signin: 'Sign in',
        signinSub: 'Welcome back',
        signup: 'Sign up',
        signupSub: 'Create an account here',
        email: 'Email address',
        username: 'Username',
        placeholderEmail: 'Input email address',
        placeholderPhone: 'Input mobile number',
        placeholderUsername: 'Create an account here',
        placeholderPassword: 'Input password',
        forgotPassword: 'Forgot Password?',
        forgotPasswordSub: 'Enter your email address',
        emailInvalid: '* Your email is invalid!',
        passwordInvalid:
          '* Passwords must have least: a number, a letter and length from 8 to 32!',
        phoneInvalid: '* Your phone is invalid!',
        usenameInvalid: '* Your name must have min lenght more 3',
        newMember: 'New member?',
        termsTextBtn: 'By signing up you agree with our Terms of Use',
        alreadyMember: 'Already a member?',
        termsOfUseTitle: 'Terms of use',
        close: 'Close',
        continue: 'Continue',
        verification: 'Verification',
        verificationSub: 'Enter the OTP code we sent to\n{{email}}',
        resendCountDown: 'Resend in {{time}}s',
        resendTitle: 'Resend OTP code',
        hi: 'Hi, {{name}}',
        pointProgress: '{{point}} / {{maxPoint}} points',
        helloGuess: 'Hello, Guess !',
        helloGuessSub: 'You can click here to sign in account',
        searchPlaceholder: 'Search coffee',
        timeline: 'Timeline',
        description: 'Description',
        timelineCtx: 'From <{{start}}> to <{{end}}>',
        everyTime: 'Every time',
        priceTitle: 'Price',
        price: '$ {{price}}',
        result: 'Results of "{{searchText}}"',
        order: 'Order',
        ship: 'Ship',
        takeAway: 'TakeAway',
        volume: 'Volume, ml',
        store: 'Store',
        shipTo: 'Ship to',
        buyNow: 'Buy now',
        addList: 'Add cart',
        note: 'Note',
        optional: 'Optional',
        allStores: 'All stores',
        addShipTo: 'Add address',
        errorAddress: 'Have error in loading address!',
        placeHolderProvinces: 'Select provives...',
        placeHolderDistricts: 'Select districts...',
        placeHolderWards: 'Select wards...',
        add: 'Add',
        homeDetail: 'Address',
        homeDetailHint: 'Input home number, street, state,...',
        phone: 'Phone',
        userAddress: "User's address",
        get: 'get',
        total: 'Total',
        amount: 'Amount',
        totalTitle: 'Total',
        myOrders: 'My cart',
        emptyCart: 'No order in cart',
        select: 'Select',
        selectAll: 'Select All',
        cancle: 'Cancle',
        pay: 'Pay',
        orderPayMent: 'Order payment',
        noteAuth: 'You need login account to continue payment',
        payMethod: 'Payment methods',
        promoMember: 'Promo of member',
        bronze: 'Bronze',
        silver: 'Silver',
        gold: 'Gold',
        diamond: 'Diamond',
        memberIs: '{{rank}} member will get {{promo}} %',
        summary: 'Summary payment',
        totalOrders: "Orders's total",
        discount: 'Discount',
        confirm: 'Confirm',
        changeTotal:
          "You will get {{point}} member's point after paying successfully",
        bill: 'Bill',
        payStatus: 'Waiting payment',
        confirmStatus: 'Waiting confirm',
        shipStatus: 'Waiting ship',
        doneStatus: 'Done',
        notUser: 'You need sign in your account!',
        emptyBill: 'Not have bills in {{status}}',
        statusBill: 'Status: {{status}}',
        payMethodBill: 'Payment method: {{method}}',
        addSuccessCart: 'Add cart successfully',
        remove: 'Remove',
        confirmTitle: 'Are you sure about this?',
        max: 'Max',
        qrIntroduce: 'Scan QR code on your bill',
        qrTitle: 'Loyalty point with payment bill',
        resultEmpty: 'Not have any bill with this QR code',
        seeBill: 'Go to bill {{id}}',
        date: 'Date',
        memberPoint: "Member's point",
        status: 'Status',
        review: 'Review',
        favorite: 'Favorite',
        countBill: '{{count}} bills',
        countBillTitle: 'Bills',
        point: '{{point}} points',
        profile: 'Profile',
        address: 'Address',
        placeholderAddress: 'Input home address',
        member: 'Member',
        rank: 'Rank',
        emptyRank: 'None',
        logout: 'Log out',
        qr: 'QR code',
        editProfile: "Edit user's profile",
        save: 'Save',
      },
    },
    vi: {
      translation: {
        titleOnboarding: 'Cà phê ngon quá, vị giác của bạn sẽ thích nó.',
        subtitleOnboarding:
          'Loại ngũ cốc ngon nhất, loại rang ngon nhất, hương vị đậm đà.',
        getStart: 'Trải nghiệm',
        signin: 'Đăng nhập',
        signinSub: 'Chào mừng quay lại',
        signup: 'Đăng ký',
        signupSub: 'Tạo tài khoản tại đây',
        placeholderEmail: 'Nhập địa chỉ email',
        placeholderPhone: 'Nhập số điện thoại',
        username: 'Tên tài khoản',
        email: 'Địa chỉ email',
        placeholderUsername: 'Nhập tên tài khoản',
        placeholderPassword: 'Nhập mật khẩu',
        forgotPassword: 'Quên mật khẩu?',
        forgotPasswordSub: 'Nhập địa chỉ email của bạn',
        emailInvalid: '* Địa chỉ chưa hợp lệ!',
        passwordInvalid:
          '* Mật khẩu phải có ít nhất một chữ cái, một số và độ dài từ 8 đến 32',
        phoneInvalid: '* Số điện thoại chưa hợp lệ!',
        usenameInvalid: '* Tên tài khoản phải có độ dài lơn hơn 3!',
        newMember: 'Thành viên mới?',
        termsTextBtn: 'Với việc đăng ký là bạn đã đồng ý với điều khoản',
        alreadyMember: 'Đã là thành viên',
        termsOfUseTitle: 'Điều khoản sử dụng',
        close: 'Đóng',
        continue: 'Tiếp tục',
        verification: 'Xác nhận',
        verificationSub: 'Nhập mã OTP chúng tôi đã gửi đến\n{{email}}',
        resendCountDown: 'Gửi lại {{time}}s',
        resendTitle: 'Gửi lại mã OTP',
        hi: 'Chào, {{name}}',
        pointProgress: '{{point}} / {{maxPoint}} điểm',
        helloGuess: 'Xin chào, Guess !',
        helloGuessSub: 'Bạn có thể bấm vào đây để đăng nhập',
        searchPlaceholder: 'Tìm kiếm món',
        timeline: 'Thời hạn',
        description: 'Mô tả',
        timelineCtx: 'Từ <{{start}}> đến <{{end}}>',
        everyTime: 'Mọi lúc',
        priceTitle: 'Giá',
        price: '{{price}} đ',
        result: 'Kết quả của "{{searchText}}"',
        order: 'Order',
        onSite: 'Tại chỗ',
        ship: 'Giao đi',
        volume: 'Dung tích, ml',
        store: 'Cửa hàng',
        shipTo: 'Giao đến',
        buyNow: 'Mua ngay',
        addList: 'Thêm vào giỏ hàng',
        note: 'Ghi chú',
        optional: 'Tùy chọn',
        allStores: 'Các cửa hàng',
        addShipTo: 'Thêm địa chỉ',
        errorAddress: 'Có lỗi xảy ra khi lấy địa chỉ!',
        placeHolderProvinces: 'Chọn thành phố, tỉnh...',
        placeHolderDistricts: 'Chọn quận, huyện...',
        placeHolderWards: 'Chọn phường, xã...',
        add: 'Thêm',
        homeDetail: 'Số nhà',
        homeDetailHint: 'Nhập số nhà, đường, tòa nhà',
        userAddress: 'Địa chỉ người dùng',
        phone: 'SĐT',
        get: 'Chọn',
        total: 'Tổng cộng',
        amount: 'Số lượng',
        totalTitle: 'Tổng',
        myOrders: 'Giỏ hàng',
        emptyCart: 'Giỏ hàng trống',
        select: 'Chọn',
        selectAll: 'Chọn tất cả',
        cancle: 'Hủy',
        pay: 'Thanh toán',
        orderPayMent: 'Thanh toán',
        noteAuth: 'Bạn cần đăng nhập tài khoản để có thể thanh toán',
        payMethod: 'Phương thức thanh toán',
        promoMember: 'Ưu đãi thành viên',
        bronze: 'Đồng',
        silver: 'Bạc',
        gold: 'Vàng',
        diamond: 'Kim cương',
        memberIs: 'Thành viên {{rank}} được giảm {{promo}}%',
        summary: 'Tổng kết thanh toán',
        totalOrders: 'Tổng tiền món',
        discount: 'Giảm giá',
        confirm: 'Xác nhận',
        changeTotal:
          'Bạn sẽ nhận {{point}} điểm thành viên sau khi thanh toán thành công',
        bill: 'Đơn hàng',
        payStatus: 'Chờ thanh toán',
        confirmStatus: 'Chờ xác nhận',
        shipStatus: 'Chờ giao hàng',
        doneStatus: 'Hoàn thành',
        notUser: 'Bạn cần đăng nhập tài khoản!',
        emptyBill: 'Đơn hàng {{status}} trống',
        statusBill: 'Trạng thái: {{status}}',
        payMethodBill: 'Phương thức thanh toán: {{method}}',
        addSuccessCart: 'Thêm vào giỏ hàng thành công',
        remove: 'Xoá',
        confirmTitle: 'Bạn có chắc về điều này?',
        max: 'Tối đa',
        qrIntroduce: 'Quét mã QR trên hóa đơn của bạn',
        qrTitle: 'Tích điểm qua hóa đơn thanh toán',
        resultEmpty: 'Không có hóa đơn theo mã QR trên',
        seeBill: 'Xem hóa đơn {{id}}',
        date: 'Thời gian',
        memberPoint: 'Điểm thành viên',
        status: 'Trạng thái',
        review: 'Đánh giá',
        favorite: 'Yêu thích',
        countBill: '{{count}} đơn',
        countBillTitle: 'Số lương đơn',
        point: '{{point}} điểm',
        profile: 'Hồ sơ',
        address: 'Địa chỉ',
        placeholderAddress: 'Nhập địa chỉ nhà',
        member: 'Thành viên',
        rank: 'Hạng',
        emptyRank: 'Chưa có',
        logout: 'Đăng xuất',
        qr: 'Mã QR',
        editProfile: 'Thay đổi thông tin cá nhân',
        save: 'Lưu',
      },
    },
  },
  lng: 'vi',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
