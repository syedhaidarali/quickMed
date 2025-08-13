<!-- @format -->

# Video Chat Implementation for QuickMed

This document explains how to implement and use the video chat system in QuickMed.

## Overview

The video chat system allows doctors and patients to have real-time video consultations with the following features:

- Video and audio calls using VideoSDK Live
- Real-time chat messaging
- Camera and microphone controls
- Participant management
- Responsive design for all devices
- Professional medical consultation platform

## Implementation

### 1. Components

- **VideoChat Component** (`src/components/videoChat/VideoChat.jsx`): Main video consultation interface with VideoSDK integration
- **ConsultationLauncher Component** (`src/components/videoChat/ConsultationLauncher.jsx`): Component to start/join consultations using VideoSDK
- **Consultation Pages**: Separate pages for patients and doctors
- **VideoSDK Configuration** (`src/config/videoSDK.js`): Centralized configuration for VideoSDK API

### 2. Features

- **VideoSDK Integration**: Uses VideoSDK Live for professional video consultations
- **Local Video Stream**: Uses browser's getUserMedia API for camera and microphone access
- **Chat System**: In-meeting text messaging with real-time updates
- **Media Controls**: Toggle camera and microphone on/off
- **Responsive Layout**: Works on all device sizes
- **Permission Handling**: Graceful fallback for camera/microphone access issues
- **Authentication**: Separate authentication for doctors and patients

## VideoSDK Configuration

### API Keys
- **API Key**: `dac164d6-2dd7-4232-b6b1-05cd1a0edb83`
- **Secret Key**: `fc6ce9fe05e735a33e7f3f234e1afe1ec8481389c54a94482d3b6685133a3ef3`

### Features
- **Meeting Creation**: Create new consultation rooms
- **Meeting Validation**: Validate existing meeting codes
- **Token Generation**: Secure authentication tokens
- **Region Support**: Singapore region (sg001) for optimal performance

## Usage

### For Patients

1. Navigate to a doctor's profile
2. Click "Book Now"
3. Choose "Video Consultation" option
4. Click "Start Video Consultation"
5. Allow camera and microphone access
6. Begin your video consultation

### For Doctors

1. Login to doctor dashboard
2. Navigate to consultation management
3. Start new consultation or join existing one
4. Begin video consultation with patient

## Routes

The following routes are available:

- `/consultation/:meetingId/:doctorId` - Patient consultation page
- `/doctor/consultation/:meetingId/:patientId` - Doctor consultation page
- `/profile` - User profile page
- `/doctor/book/:slug` - Enhanced booking page with video consultation options
- `/doctor/profile` - Doctor profile with consultation management

## Technical Details

### VideoSDK Implementation

The system integrates with VideoSDK Live:

- **Meeting Creation**: `createMeeting()` function creates new consultation rooms
- **Authentication**: `generateAuthToken()` generates secure tokens
- **Validation**: `validateMeeting()` checks meeting validity
- **Real-time Communication**: WebRTC-based video and audio streaming

### State Management

- **AuthContext**: Manages user authentication state
- **DoctorContext**: Manages doctor authentication and profile data
- **VideoSDK State**: Local state for media streams and connections
- **Meeting State**: Consultation session management

### Browser Compatibility

- Modern browsers with WebRTC support
- HTTPS required for camera/microphone access
- Fallback handling for unsupported features
- Mobile-responsive design

## Security & Privacy

### Current Implementation

- **VideoSDK Authentication**: Secure token-based authentication
- **Meeting Privacy**: Private consultation rooms
- **Data Encryption**: End-to-end encryption for video calls
- **User Isolation**: Separate authentication contexts for doctors and patients

### Future Enhancements

- **Backend Integration**: Server-side token generation
- **Meeting Recording**: Consultation recording capabilities
- **Analytics**: Usage tracking and reporting
- **Payment Integration**: Consultation fee processing

## Customization

### Styling

The components use Tailwind CSS classes and follow the existing design system:

- Emerald color scheme for primary elements
- Blue accents for video consultation features
- Green highlights for joining consultations
- Consistent spacing and typography

### Features

You can easily customize:

- Video grid layout
- Chat interface design
- Control button styling
- Color schemes
- Meeting room configurations

## Troubleshooting

### Common Issues

1. **Camera/Microphone not working**

   - Check browser permissions
   - Ensure HTTPS is enabled
   - Check device settings
   - Try refreshing the page

2. **Video not displaying**

   - Check camera permissions
   - Ensure camera is not in use by other applications
   - Check browser console for errors

3. **Audio issues**
   - Check microphone permissions
   - Ensure correct audio device is selected
   - Check system volume settings

4. **Authentication failures**
   - Check VideoSDK API key configuration
   - Verify token generation
   - Check network connectivity

### Debug Mode

Enable debug logging by checking the browser console for:

- Media stream initialization
- Permission status
- VideoSDK connection status
- Error messages

## Current Status

### ✅ Implemented Features

1. **VideoSDK Integration**
   - API configuration and authentication
   - Meeting creation and management
   - Token generation system

2. **User Interface**
   - Consultation launcher for both doctors and patients
   - Video chat interface with controls
   - Chat messaging system
   - Participant management

3. **Authentication**
   - Separate contexts for users and doctors
   - Proper authentication state management
   - Secure token handling

4. **Meeting Management**
   - Start new consultations
   - Join existing consultations
   - Meeting code validation
   - Session storage

### 🔄 In Progress

1. **Real-time Video Connection**
   - WebRTC peer connections
   - Multiple participant support
   - Screen sharing capabilities

2. **Backend Integration**
   - Server-side token generation
   - Meeting persistence
   - User analytics

### 📋 Planned Features

1. **Advanced Video Features**
   - Screen sharing
   - File sharing in chat
   - Recording capabilities
   - Virtual backgrounds

2. **Enhanced Chat**
   - Emoji support
   - File attachments
   - Message history
   - Typing indicators

3. **Meeting Management**
   - Waiting room functionality
   - Consultation scheduling
   - Payment processing
   - Follow-up appointments

## Development Notes

### Architecture Decisions

- **Modular Design**: Separate components for different functionalities
- **Context Separation**: Clear separation between user and doctor contexts
- **VideoSDK Integration**: Professional video platform integration
- **Responsive Design**: Mobile-first approach for accessibility

### Performance Considerations

- **Lazy Loading**: Components load only when needed
- **Stream Management**: Efficient media stream handling
- **Memory Management**: Proper cleanup of resources
- **Network Optimization**: Optimized for various connection speeds

## Support

For technical issues:

- Check browser console for errors
- Verify camera/microphone permissions
- Test with different browsers
- Review network connectivity
- Check VideoSDK configuration

For feature requests:

- Document specific requirements
- Consider user experience impact
- Plan integration with existing systems
- Evaluate VideoSDK capabilities

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install @videosdk.live/react-sdk @videosdk.live/js-sdk axios
   ```

2. **Configure VideoSDK**
   - Update API keys in `src/config/videoSDK.js`
   - Set up backend token generation (optional)

3. **Start Development**
   ```bash
   npm run dev
   ```

4. **Test Video Consultation**
   - Login as doctor or patient
   - Navigate to consultation page
   - Start or join a consultation

## Production Deployment

### Environment Variables
```bash
REACT_APP_VIDEO_SDK_API_KEY=your_api_key
REACT_APP_VIDEO_SDK_SECRET_KEY=your_secret_key
```

### Security Checklist
- [ ] HTTPS enabled
- [ ] Backend token generation implemented
- [ ] API keys secured
- [ ] User authentication verified
- [ ] Meeting privacy configured
- [ ] Error handling implemented
