import { Dimensions, Platform, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    // Container Styles
    container: {
        flex: 1,
        backgroundColor: '#f9fafb',
    },

    // Login Screen Styles
    loginContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    loginContent: {
        width: '100%',
        maxWidth: 400,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    logoCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
            },
            android: {
                elevation: 8,
            },
        }),
    },
    logoEmoji: {
        fontSize: 50,
    },
    appTitle: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },
    appSubtitle: {
        fontSize: 18,
        color: 'rgba(255,255,255,0.9)',
        textAlign: 'center',
    },
    loginBox: {
        backgroundColor: '#fff',
        borderRadius: 25,
        padding: 30,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 12,
            },
            android: {
                elevation: 8,
            },
        }),
    },
    input: {
        backgroundColor: '#f9fafb',
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        fontSize: 16,
    },
    authButton: {
        backgroundColor: '#22c55e',
        paddingVertical: 16,
        borderRadius: 12,
        marginTop: 8,
        alignItems: 'center',
    },
    authButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    featuresContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
    },
    featureCard: {
        flex: 1,
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#f3f4f6',
        borderRadius: 15,
    },
    featureEmoji: {
        fontSize: 32,
        marginBottom: 8,
    },
    featureText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#6b7280',
    },

    // Navigation Bar Styles
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 15,
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    navLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    navLogo: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    navLogoText: {
        fontSize: 24,
    },
    navTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1f2937',
    },
    navRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    pointsBadge: {
        backgroundColor: '#dcfce7',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight: 12,
    },
    pointsText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#16a34a',
    },
    menuIcon: {
        fontSize: 24,
        color: '#6b7280',
    },

    // Tab Bar Styles
    tabBar: {
        backgroundColor: '#f9fafb',
        paddingHorizontal: 20,
        paddingVertical: 15,
        flexGrow: 0,
    },
    tab: {
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 20,
        backgroundColor: '#fff',
        marginRight: 10,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
            },
            android: {
                elevation: 2,
            },
        }),
    },
    tabActive: {
        backgroundColor: '#22c55e',
    },
    tabText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#6b7280',
    },
    tabTextActive: {
        color: '#fff',
    },

    // Content Styles
    content: {
        flex: 1,
        backgroundColor: '#f9fafb',
    },
    homeContent: {
        padding: 20,
        paddingBottom: 40,
    },

    // Welcome Card Styles
    welcomeCard: {
        borderRadius: 25,
        padding: 25,
        marginBottom: 20,
        overflow: 'hidden',
    },
    welcomeTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
    },
    welcomeSubtitle: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.9)',
        marginBottom: 20,
    },
    statsRow: {
        flexDirection: 'row',
        gap: 15,
    },
    statCard: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 15,
        padding: 15,
        backdropFilter: 'blur(10px)',
    },
    statIcon: {
        fontSize: 20,
        marginBottom: 8,
    },
    statValue: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
    },
    statLabel: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.9)',
    },

    // Impact Card Styles
    impactCard: {
        backgroundColor: '#fff',
        borderRadius: 25,
        padding: 20,
        marginBottom: 20,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            },
            android: {
                elevation: 3,
            },
        }),
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#1f2937',
    },
    impactContent: {
        borderRadius: 20,
        padding: 30,
        alignItems: 'center',
    },
    impactValue: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#16a34a',
    },
    impactLabel: {
        fontSize: 16,
        color: '#6b7280',
        marginBottom: 8,
        fontWeight: '500',
    },
    impactSubtext: {
        fontSize: 12,
        color: '#9ca3af',
        textAlign: 'center',
    },

    // Camera Button Styles
    cameraButton: {
        marginBottom: 20,
        borderRadius: 20,
        overflow: 'hidden',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 8,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    cameraButtonGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
    },
    cameraIcon: {
        fontSize: 24,
        marginRight: 10,
    },
    cameraButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },

    // Actions Grid Styles
    actionsGrid: {
        backgroundColor: '#fff',
        borderRadius: 25,
        padding: 20,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            },
            android: {
                elevation: 3,
            },
        }),
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 12,
    },
    actionCard: {
        width: (width - 64) / 2,
        backgroundColor: '#f9fafb',
        borderRadius: 20,
        padding: 15,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#e5e7eb',
    },
    actionEmoji: {
        fontSize: 40,
        marginBottom: 10,
    },
    actionName: {
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 5,
        color: '#374151',
    },
    actionPoints: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#16a34a',
    },

    // Leaderboard Styles
    leaderboardContent: {
        padding: 20,
        paddingBottom: 40,
    },
    pageTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#1f2937',
    },
    leaderboardRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 15,
        marginBottom: 12,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 2,
            },
            android: {
                elevation: 2,
            },
        }),
    },
    leaderboardRowUser: {
        backgroundColor: '#dcfce7',
        borderWidth: 2,
        borderColor: '#22c55e',
    },
    leaderboardRank: {
        fontSize: 20,
        fontWeight: 'bold',
        width: 50,
        textAlign: 'center',
    },
    leaderboardAvatar: {
        fontSize: 32,
        marginHorizontal: 10,
    },
    leaderboardInfo: {
        flex: 1,
    },
    leaderboardName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: 2,
    },
    leaderboardPoints: {
        fontSize: 14,
        color: '#6b7280',
    },
    leaderboardStar: {
        fontSize: 24,
        marginLeft: 10,
    },

    // History Styles
    historyContent: {
        padding: 20,
        paddingBottom: 40,
    },
    emptyState: {
        alignItems: 'center',
        paddingVertical: 80,
    },
    emptyEmoji: {
        fontSize: 80,
        marginBottom: 20,
        opacity: 0.3,
    },
    emptyText: {
        fontSize: 18,
        color: '#9ca3af',
    },
    historyCard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 4,
            },
            android: {
                elevation: 2,
            },
        }),
    },
    historyImage: {
        width: 80,
        height: 80,
        borderRadius: 15,
        marginRight: 15,
        backgroundColor: '#f3f4f6',
    },
    historyInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    historyName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#1f2937',
    },
    historyDate: {
        fontSize: 12,
        color: '#6b7280',
        marginBottom: 10,
    },
    historyBadges: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    historyBadgeGreen: {
        backgroundColor: '#dcfce7',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
    },
    historyBadgeBlue: {
        backgroundColor: '#dbeafe',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
    },
    historyBadgeText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#374151',
    },

    // Camera Styles
    cameraContainer: {
        flex: 1,
        backgroundColor: '#000',
    },
    camera: {
        flex: 1,
    },
    cameraOverlay: {
        flex: 1,
        justifyContent: 'space-between',
    },
    cameraHeader: {
        padding: 20,
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
    },
    cameraClose: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cameraCloseText: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
    },
    cameraFooter: {
        padding: 20,
        paddingBottom: 40,
        alignItems: 'center',
    },
    cameraHint: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
        backgroundColor: 'rgba(0,0,0,0.6)',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 20,
    },
    captureButtonContainer: {
        position: 'absolute',
        bottom: 50,
        alignSelf: 'center',
    },
    captureButton: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#fff',
        borderWidth: 5,
        borderColor: '#22c55e',
        justifyContent: 'center',
        alignItems: 'center',
    },
    captureButtonInner: {
        width: 54,
        height: 54,
        borderRadius: 27,
        backgroundColor: '#fff',
    },

    // Preview Styles
    previewContainer: {
        flex: 1,
        backgroundColor: '#000',
    },
    previewImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    previewOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 30,
        paddingBottom: Platform.OS === 'ios' ? 50 : 30,
        backgroundColor: 'rgba(0,0,0,0.5)',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    retakeButton: {
        backgroundColor: '#fff',
        paddingHorizontal: 28,
        paddingVertical: 14,
        borderRadius: 20,
    },
    retakeButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1f2937',
    },
    verifyButton: {
        backgroundColor: '#22c55e',
        paddingHorizontal: 28,
        paddingVertical: 14,
        borderRadius: 20,
    },
    verifyButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },

    // Reward Popup Styles
    rewardOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
    },
    rewardCard: {
        backgroundColor: '#fff',
        borderRadius: 30,
        padding: 40,
        alignItems: 'center',
        maxWidth: 350,
        width: '100%',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.3,
                shadowRadius: 20,
            },
            android: {
                elevation: 10,
            },
        }),
    },
    rewardEmoji: {
        fontSize: 80,
        marginBottom: 20,
    },
    rewardTitle: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#16a34a',
        marginBottom: 10,
    },
    rewardSubtitle: {
        fontSize: 18,
        color: '#6b7280',
        marginBottom: 30,
        textAlign: 'center',
    },
    rewardPoints: {
        borderRadius: 20,
        padding: 30,
        alignItems: 'center',
        width: '100%',
    },
    rewardPointsValue: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#16a34a',
    },
    rewardPointsLabel: {
        fontSize: 16,
        color: '#6b7280',
        marginBottom: 15,
        fontWeight: '500',
    },
    rewardCO2: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
    },
    rewardCO2Text: {
        fontSize: 14,
        color: '#6b7280',
        fontWeight: '500',
    },

    // Menu Styles
    menuOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    menuContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 30,
        paddingBottom: Platform.OS === 'ios' ? 50 : 30,
    },
    menuHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
    },
    menuTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1f2937',
    },
    menuClose: {
        fontSize: 24,
        color: '#6b7280',
    },
    menuProfile: {
        backgroundColor: '#f9fafb',
        borderRadius: 15,
        padding: 20,
        alignItems: 'center',
        marginBottom: 30,
    },
    menuAvatar: {
        fontSize: 40,
        marginBottom: 10,
    },
    menuName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: 5,
    },
    menuEmail: {
        fontSize: 14,
        color: '#6b7280',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fee2e2',
        paddingVertical: 16,
        borderRadius: 15,
    },
    logoutIcon: {
        fontSize: 20,
        marginRight: 10,
    },
    logoutText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#dc2626',
    },




    rewardsContent: {
        padding: 20,
        paddingBottom: 40,
    },
    balanceCard: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    rewardCard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        marginBottom: 15,
        borderWidth: 2,
        borderColor: '#e5e7eb',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    rewardEmoji: {
        fontSize: 48,
        marginRight: 15,
    },
    rewardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1f2937',
        marginBottom: 4,
    },
    rewardDescription: {
        fontSize: 14,
        color: '#6b7280',
    },
    rewardCost: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#16a34a',
        backgroundColor: '#dcfce7',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 10,
    },
    redeemButton: {
        backgroundColor: '#22c55e',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 12,
    },
    redeemButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 14,
    },

});



