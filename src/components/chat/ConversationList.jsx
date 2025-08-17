/** @format */
import React from "react";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Search, MessageCircle } from "lucide-react";

const ConversationList = ({
  allDoctors,
  threads,
  searchQuery,
  setSearchQuery,
  selectedDoctor,
  onDoctorSelect,
  onThreadSelect,
  currentThread,
  user,
  isDoctorRoute,
  isUserRoute,
}) => {
  // Filter doctors based on search query
  const filteredDoctors = allDoctors.filter(
    (doctor) =>
      doctor.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get all participants except current user
  const getThreadParticipants = (thread) =>
    (thread.participants || []).filter((p) => p.userId !== user?._id);

  // Return either a matched doctor object from allDoctors OR a fallback participant object
  const getDoctorFromThread = (thread) => {
    const participants = getThreadParticipants(thread);
    const participant = participants[0]; // if group thread, this picks first other participant
    const participantId = participant?.userId;

    // try to find a doctor record
    const doctor = allDoctors.find((d) => d._id === participantId);
    if (doctor) return doctor;

    // fallback: build a lightweight object from participant/thread data so we can still render UI
    const fallbackName =
      participant?.name ||
      participant?.displayName ||
      thread?.name ||
      "Unknown";
    const fallbackAvatar =
      participant?.avatar ||
      participant?.profileImage ||
      thread?.avatar ||
      null;

    return {
      _id: participantId || thread._id,
      name: fallbackName,
      profileImage: fallbackAvatar,
      specialty: participant?.role || thread?.subtitle || "",
    };
  };

  // helper to show last message preview (if available)
  const getLastMessagePreview = (thread) =>
    thread.lastMessage?.text ||
    thread.lastMessage?.content ||
    thread.lastMessage?.preview ||
    thread.preview ||
    "";

  return (
    <div className='w-full h-full flex flex-col bg-white'>
      {/* Header */}
      <div className='p-4 border-b bg-green-600 text-white'>
        <h2 className='text-lg font-semibold'>Chats</h2>
      </div>

      {/* Search Bar */}
      <div className='p-3 border-b'>
        <div className='relative'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
          <Input
            placeholder='Search doctors...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='pl-10 bg-gray-50 border-0 focus:bg-white'
          />
        </div>
      </div>

      {/* Existing Threads */}
      {threads.length > 0 && (
        <div className='flex-1 overflow-y-auto'>
          <div className='p-3 border-b bg-gray-50'>
            <h3 className='text-sm font-medium text-gray-600'>Recent Chats</h3>
          </div>

          {threads.map((thread) => {
            const doctorOrParticipant = getDoctorFromThread(thread);

            // optional: allow filtering threads by searchQuery (search by participant name or specialty)
            const matchesSearch =
              !searchQuery ||
              doctorOrParticipant?.name
                ?.toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
              doctorOrParticipant?.specialty
                ?.toLowerCase()
                .includes(searchQuery.toLowerCase());

            if (!matchesSearch) return null;

            return (
              <div
                key={thread._id}
                onClick={() => onThreadSelect(thread, doctorOrParticipant)}
                className={`p-3 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                  currentThread === thread._id
                    ? "bg-green-50 border-l-4 border-l-green-500"
                    : ""
                }`}>
                <div className='flex items-center space-x-3'>
                  <Avatar className='h-12 w-12'>
                    {doctorOrParticipant.profileImage ? (
                      <AvatarImage src={doctorOrParticipant.profileImage} />
                    ) : (
                      <AvatarFallback className='bg-green-100 text-green-600'>
                        {doctorOrParticipant.name?.charAt(0)}
                      </AvatarFallback>
                    )}
                  </Avatar>

                  <div className='flex-1 min-w-0'>
                    <div className='flex items-center justify-between'>
                      <h4 className='font-medium text-gray-900 truncate'>
                        {doctorOrParticipant.name}
                      </h4>
                      <span className='text-xs text-gray-500'>
                        {thread.updatedAt
                          ? new Date(thread.updatedAt).toLocaleDateString()
                          : ""}
                      </span>
                    </div>

                    <p className='text-sm text-gray-500 truncate'>
                      {getLastMessagePreview(thread) ||
                        doctorOrParticipant.specialty}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Available Doctors */}
      {searchQuery && (
        <div className='flex-1 overflow-y-auto'>
          <div className='p-3 border-b bg-gray-50'>
            <h3 className='text-sm font-medium text-gray-600'>
              Available Doctors
            </h3>
          </div>
          {filteredDoctors.slice(0, 3).map((doctor) => (
            <div
              key={doctor._id}
              onClick={() => onDoctorSelect(doctor)}
              className={`p-3 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedDoctor?._id === doctor._id
                  ? "bg-green-50 border-l-4 border-l-green-500"
                  : ""
              }`}>
              <div className='flex items-center space-x-3'>
                <Avatar className='h-12 w-12'>
                  <AvatarImage src={doctor.profileImage} />
                  <AvatarFallback className='bg-green-100 text-green-600'>
                    {doctor.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className='flex-1 min-w-0'>
                  <h4 className='font-medium text-gray-900 truncate'>
                    {doctor.name}
                  </h4>
                  <p className='text-sm text-gray-500 truncate'>
                    {doctor.specialty}
                  </p>
                </div>
                <MessageCircle className='h-5 w-5 text-green-500' />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No search results */}
      {searchQuery && filteredDoctors.length === 0 && (
        <div className='flex-1 flex items-center justify-center text-gray-500'>
          <p>No doctors found</p>
        </div>
      )}
    </div>
  );
};

export default ConversationList;
