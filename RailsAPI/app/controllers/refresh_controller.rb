class RefreshController < ApplicationController
    # before_action :authorize_refresh_request!

    # def create
    #     session = JWTSessions::Session.new(payload: access_payload)
    #     render json: session.refresh(found_token)
    # end

    # def access_payload
    #     build_access_payload_based_on_refresh(payload)
    # end
    before_action :authorize_refresh_by_access_request!
    def create
        session = JWTSessions::Session.new(payload: claimless_payload, refresh_by_access_allowed: true)
        tokens = session.refresh_by_access_allowed do
            raise JWTSessions::Error:Unauthorized, "Somethings not right here!" 
        end
        respone.set_cookie(
                            JWTSessions.access_cookie,
                            value: tokens[:access],
                            httponly: true,
                            secure: Rails.env.production?)
        render json: { crsf: tokens[:crsf] } 
    end
end
